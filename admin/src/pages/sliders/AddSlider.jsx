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
    add_slider
} from '../../redux/actions/SliderActions.js'

const AddSlider = (props) => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const addSlider = async (data, e) => {
        const form = new FormData()
        props.show_progress()
        try {
            form.append('heading', data.heading)
            form.append('slider', data.slider[0])
            const result = await props.add_slider({
                data: form
            })
            props.show_success({
                message: result.data.message
            })
            e.target.reset()
        } catch (err) {
            let showError = 'Something went wrong, please try again'
            if (!_.isUndefined(err.response.data.err.code) && err.response.data.err.code == 11000) {
                showError = "Slider with this heading already added"
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
            <TemplateHeader header="Add New Slider" more={
                <div className="col-auto text-right">
                    <a onClick={
                        e => props.history.push('/sliders/')
                    } className="btn btn-primary add-button ml-3">
                        <i className="fas fa-arrow-left"></i>
                    </a>
                </div>
            } />
            <div className="card rounded">
                <div className="card-body profile-menu">
                    <form onSubmit={handleSubmit(addSlider)} autoComplete={'off'}>
                        <div className="row mt-2">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Heading</label>
                                    <input type="text" {...register('heading', { required: true })} className="form-control" />
                                    {errors.heading && <FormError error={errors.heading} />}
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Cover</label>
                                    <input type="file" {...register('slider', { required: true })} className="form-control" />
                                    {errors.slider && <FormError error={errors.slider} />}
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
        add_slider: (payload) => dispatch(add_slider(payload))
    }
}

export default connect(null, MapDispatchToProps)(AddSlider)