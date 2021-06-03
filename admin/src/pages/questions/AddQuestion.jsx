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
    get_all_subjects
} from '../../redux/actions/SubjectActions.js'
import {
    add_question
} from '../../redux/actions/QuestionActions.js'
import { show_modal } from '../../redux/actions/ModalActions.js'

const AddQuestion = (props) => {
    useEffect(() => {
        getSubjects()
    }, [])

    const [subjects, setSubjects] = useState([])

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()



    const getSubjects = async () => {
        props.show_progress()
        try {
            const result = await props.get_all_subjects()
            setSubjects(result.data.subjectsList)
        } catch (err) {
            props.show_error({
                message: "Unable to fetch subjects"
            })
        }
        props.hide_progress()
    }

    const addQuestion = async (data, e) => {
        props.show_progress()
        try {
            const result = await props.add_question({
                data: data
            })
            props.show_success({
                message: 'Question added successfully'
            })
            e.target.reset()
        } catch (err) {
            let showError = 'Something went wrong, please try again'
            if (!_.isUndefined(err.response.data.err.code) && err.response.data.err.code == 11000) {
                showError = "Question already added"
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
            <TemplateHeader header="Add new question" more={
                <div className="col-auto text-right">
                    <a onClick={
                        e => props.history.push('/questions/')
                    } className="btn btn-primary add-button ml-3">
                        <i className="fas fa-arrow-left"></i>
                    </a>
                </div>
            } />
            <div className="card rounded">
                <div className="card-body profile-menu">
                    <form onSubmit={handleSubmit(addQuestion)}>
                        <div className="row">
                            <div className="col-sm-12">
                                <label>Question</label>
                                <textarea type="password" {...register('question', { required: true })} className="form-control"></textarea>
                                {errors.question && <FormError error={errors.question} />}
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label>Option A</label>
                                    <input type="text" {...register('option_a', { required: true })} className="form-control" />
                                    {errors.option_a && <FormError error={errors.option_a} />}
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label>Option B</label>
                                    <input type="text" {...register('option_b', { required: true })} className="form-control" />
                                    {errors.option_b && <FormError error={errors.option_b} />}
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label>Option C</label>
                                    <input type="text" {...register('option_c', { required: true })} className="form-control" />
                                    {errors.option_c && <FormError error={errors.option_c} />}
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label>Option D</label>
                                    <input type="text" {...register('option_d', { required: true })} className="form-control" />
                                    {errors.option_d && <FormError error={errors.option_d} />}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                                <label htmlFor="">Subject</label>
                                <select className="form-control" {...register('subject', { required: true })}>
                                    <option defaultValue value="">--select a subject--</option>
                                    {
                                        subjects.map((subject, index) => {
                                            return (
                                                <option key={index + 1} value={subject._id}>{subject.subject}</option>
                                            )
                                        })
                                    }
                                </select>
                                {errors.subject && <FormError error={errors.subject} />}
                            </div>
                            <div className="col-sm-4">
                                <label htmlFor="">Answer</label>
                                <select className="form-control" {...register('answer', { required: true })}>
                                    <option defaultValue value="">--choose answer--</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </select>
                                {errors.answer && <FormError error={errors.answer} />}
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
        get_all_subjects: () => dispatch(get_all_subjects()),
        add_question: (payload) => dispatch(add_question(payload))
    }
}

export default connect(null, MapDispatchToProps)(AddQuestion)