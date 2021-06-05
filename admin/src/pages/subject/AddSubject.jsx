import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import _ from 'lodash'
import FormError from '../components/template/FormError.jsx'
import TemplateHeader from '../components/template/TemplateHeader.jsx'
import {
    show_error,
    show_success
} from '../../redux/actions/SnackbarActions.js'
import {
    hide_progress,
    show_progress
} from '../../redux/actions/ProgressAction.js'
import {
    add_subject
} from '../../redux/actions/SubjectActions.js'

const AddSubject = (props) => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const addSubject = async (data, e) => {
        const form = new FormData()
        props.show_progress()
        try {
            form.append('subject', data.subject)
            form.append('subject_file', data.subject_file[0])
            const result = await props.add_subject({
                data: form
            })
            props.show_success({
                message: result.data.message
            })
            e.target.reset()
        } catch (err) {
            let showError = 'Something went wrong, please try again'
            if (!_.isUndefined(err.response.data.err.code) && err.response.data.err.code == 11000) {
                showError = "Subject already added"
                e.target.reset()
            } else {
                showError = err.response.data.message
            }
            props.show_error({
                message: showError
            })
        }
        props.hide_progress()
    }

    return (
        <>
            <TemplateHeader header="Add New Subject" more={
                <div className="col-auto text-right">
                    <a onClick={
                        e => props.history.push('/subjects/')
                    } className="btn btn-primary add-button ml-3">
                        <i className="fas fa-arrow-left"></i>
                    </a>
                </div>
            } />
            <div className="card rounded">
                <div className="card-body profile-menu">
                    <form onSubmit={handleSubmit(addSubject)} autoComplete={'off'}>
                        <div className="row mt-2">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Subject name</label>
                                    <input type="text" {...register('subject', { required: true })} className="form-control" />
                                    {errors.subject && <FormError error={errors.subject} />}
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Cover</label>
                                    <input type="file" {...register('subject_file', { required: true })} className="form-control" />
                                    {errors.subject_file && <FormError error={errors.subject_file} />}
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 save-form">
                            <button className="btn save-btn btn-primary" type="submit">Proceed</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

const MapDispatchToProps = (dispatch) => {
    return {
        show_error: (payload) => dispatch(show_error(payload)),
        show_success: (payload) => dispatch(show_success(payload)),
        show_progress: () => dispatch(show_progress()),
        hide_progress: () => dispatch(hide_progress()),
        add_subject: (payload) => dispatch(add_subject(payload))
    }
}

export default connect(null, MapDispatchToProps)(AddSubject)