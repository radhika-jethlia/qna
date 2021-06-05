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
    update_subject,
    get_subject_by_id
} from '../../redux/actions/SubjectActions.js'
import { CircularProgress } from '@material-ui/core'
import {BASE_URI} from '../../utils/API'

const EditSubject = (props) => {

    const [subject, setSubject] = useState()

    useEffect(() => {
        const subjectId = props.match.params.subjectId
        if (subjectId === null) {
            props.history.push('/subjects/')
        }
        getSubject(subjectId)
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const getSubject = async (subjectId) => {
        try {
            const result = await props.get_subject_by_id({
                subjectId: subjectId
            })
            setSubject(result.data.result)
        } catch (err) {
            props.show_error({
                message: err.response.data.message
            })
        }
    }

    const editor = async (data, e) => {
        const form = new FormData()
        props.show_progress()
        try {
            form.append('subject', data.subject)
            !_.isUndefined(data.subject_file[0]) && form.append('subject_file', data.subject_file[0])
            const result = await props.update_subject({
                data: form,
                subjectId: props.match.params.subjectId
            })
            console.log(result)
            props.show_success({
                message: "Subject updated"
            })
            props.history.push('/subjects')
        } catch (err) {
            props.show_error({
                message: err.response.data.message
            })
        }
        props.hide_progress()
    }

    return (
        <>
            <TemplateHeader header="Edit Subject" more={
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
                    {
                        _.isEmpty(subject) &&
                        <div>
                            <center className={'mt-2'}><CircularProgress /></center>
                        </div>
                    }
                    {
                        !_.isEmpty(subject) &&
                        <form onSubmit={handleSubmit(editor)} autoComplete={'off'}>
                            <div className="row mt-2">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Subject name</label>
                                        <input type="text" defaultValue={subject.subject} {...register('subject', { required: true })} className="form-control" />
                                        {errors.subject && <FormError error={errors.subject} />}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Cover</label>
                                        <input type="file" {...register('subject_file')} className="form-control" />
                                        {errors.subject_file && <FormError error={errors.subject_file} />}
                                        <br />
                                        <img className="rounded service-img mr-1" src={BASE_URI + '/' + subject.file_name} alt="Subject Image" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 save-form">
                                <button className="btn save-btn btn-primary" type="submit">Proceed</button>
                            </div>
                        </form>
                    }
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
        update_subject: (payload) => dispatch(update_subject(payload)),
        get_subject_by_id: (payload) => dispatch(get_subject_by_id(payload))
    }
}

export default connect(null, MapDispatchToProps)(EditSubject)