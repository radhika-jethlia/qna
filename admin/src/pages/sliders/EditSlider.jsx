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
    update_slider,
    get_slider_by_id
} from '../../redux/actions/SliderActions.js'
import { CircularProgress } from '@material-ui/core'
import {BASE_URI} from '../../utils/API'

const EditSlider = (props) => {

    const [slider, setSlider] = useState()

    useEffect(() => {
        const sliderId = props.match.params.sliderId
        if (sliderId === null) {
            props.history.push('/subjects/')
        }
        getSlider(sliderId)
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const getSlider = async (sliderId) => {
        try {
            const result = await props.get_slider_by_id({
                sliderId: sliderId
            })
            setSlider(result.data.result)
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
            form.append('heading', data.heading)
            !_.isUndefined(data.slider[0]) && form.append('slider', data.slider[0])
            const result = await props.update_slider({
                data: form,
                sliderId: props.match.params.sliderId
            })
            props.show_success({
                message: "Slider updated"
            })
            console.log(result)
            props.history.push('/sliders')
        } catch (err) {
            props.show_error({
                message: err.response.data.message
            })
        }
        props.hide_progress()
    }

    return (
        <>
            <TemplateHeader header="Edit Slider" more={
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
                    {
                        _.isEmpty(slider) &&
                        <div>
                            <center className={'mt-2'}><CircularProgress /></center>
                        </div>
                    }
                    {
                        !_.isEmpty(slider) &&
                        <form onSubmit={handleSubmit(editor)} autoComplete={'off'}>
                            <div className="row mt-2">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Heading</label>
                                        <input type="text" defaultValue={slider.heading} {...register('heading', { required: true })} className="form-control" />
                                        {errors.heading && <FormError error={errors.heading} />}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Cover</label>
                                        <input type="file" {...register('slider')} className="form-control" />
                                        {errors.slider && <FormError error={errors.slider} />}
                                        <br />
                                        <img className="rounded service-img mr-1" src={BASE_URI + '/' + slider.file_name} alt="Slider Image" />
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
        update_slider: (payload) => dispatch(update_slider(payload)),
        get_slider_by_id: (payload) => dispatch(get_slider_by_id(payload))
    }
}

export default connect(null, MapDispatchToProps)(EditSlider)