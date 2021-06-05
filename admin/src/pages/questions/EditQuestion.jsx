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
    get_question_by_id,
    update_question
} from '../../redux/actions/QuestionActions.js'
import { CircularProgress } from '@material-ui/core'

const EditQuestion = (props) => {
    useEffect(() => {
        const questionId = props.match.params.questionId
        getQuestion(questionId)
        getSubjects()
    }, [])

    const [question, setQuestion] = useState([])
    const [subjects, setSubjects] = useState([])

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const getQuestion = async (questionId) => {
        try {
            const result = await props.get_question_by_id({
                questionId: questionId
            })
            setQuestion(result.data.question)
        } catch (err) {
            props.show_error({
                message: "Unable to fetch question"
            })
            props.history.push('/questions')
        }
    }

    const getSubjects = async () => {
        try {
            const result = await props.get_all_subjects()
            setSubjects(result.data.subjectsList)
        } catch (err) {
            props.show_error({
                message: "Unable to fetch subjects"
            })
        }
    }

    const editor = async (data) => {
        props.show_progress()
        try {
            const result = await props.update_question({
                questionId: props.match.params.questionId,
                data: data
            })
            props.show_success({
                message: result.data.message
            })
            props.history.push('/questions')
        } catch (err) {
            props.show_error({
                message: "Unable to update"
            })
        }
        props.hide_progress()
    }

    return (
        <>
            <TemplateHeader header="Edit question" more={
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
                    {
                        _.isEmpty(question) &&
                        <div>
                            <center className={'mt-2'}><CircularProgress /></center>
                        </div>
                    }
                    {
                        !_.isEmpty(question) &&
                        <form onSubmit={handleSubmit(editor)}>
                            <div className="row">
                                <div className="col-sm-12">
                                    <label>Question</label>
                                    <textarea type="password" defaultValue={question.question} {...register('question', { required: true })} className="form-control"></textarea>
                                    {errors.question && <FormError error={errors.question} />}
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label>Option A</label>
                                        <input type="text" defaultValue={question.option_a} {...register('option_a', { required: true })} className="form-control" />
                                        {errors.option_a && <FormError error={errors.option_a} />}
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label>Option B</label>
                                        <input type="text" defaultValue={question.option_b} {...register('option_b', { required: true })} className="form-control" />
                                        {errors.option_b && <FormError error={errors.option_b} />}
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label>Option C</label>
                                        <input type="text" defaultValue={question.option_c} {...register('option_c', { required: true })} className="form-control" />
                                        {errors.option_c && <FormError error={errors.option_c} />}
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label>Option D</label>
                                        <input type="text" defaultValue={question.option_d} {...register('option_d', { required: true })} className="form-control" />
                                        {errors.option_d && <FormError error={errors.option_d} />}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label htmlFor="">Subject</label>
                                    <select className="form-control" defaultValue={question.subject._id} {...register('subject', { required: true })}>
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
                                    <select className="form-control" defaultValue={question.answer} {...register('answer', { required: true })}>
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
        get_all_subjects: () => dispatch(get_all_subjects()),
        update_question: (payload) => dispatch(update_question(payload)),
        get_question_by_id: (payload) => dispatch(get_question_by_id(payload))
    }
}

export default connect(null, MapDispatchToProps)(EditQuestion)