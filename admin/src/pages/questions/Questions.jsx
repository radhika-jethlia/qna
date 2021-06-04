import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import TemplateHeader from '../components/template/TemplateHeader.jsx'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { hide_modal, show_modal } from '../../redux/actions/ModalActions.js'
import {
    get_all_subjects
} from '../../redux/actions/SubjectActions.js'
import { show_error, show_success } from '../../redux/actions/SnackbarActions.js'
import { hide_progress, show_progress } from '../../redux/actions/ProgressAction.js'
import _ from 'lodash'
import {
    get_all_questions,
    get_questions_by_subject,
    get_active_questions,
    get_inactive_questions,
    update_question
} from '../../redux/actions/QuestionActions.js'
import { Backdrop, CircularProgress } from '@material-ui/core'

const Questions = (props) => {
    const [questions, setQuestions] = useState([])
    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        getQuestions()
        getSubjects()
    }, [])

    const getQuestions = async () => {
        try {
            const result = await props.get_all_questions()
            setQuestions(result.data.questions)
        } catch (err) {
            props.show_error({
                message: "Unable to fetch questions"
            })
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

    const getBySubjects = async (val) => {
        props.show_progress()
        try {
            const result = await props.get_questions_by_subject({
                subject: val
            })
            setQuestions(result.data.questions)
        } catch (err) {
            props.show_error({
                message: "Unable to fetch questions"
            })
        }
        props.hide_progress()
    }

    const filterByStatus = async (val) => {
        if (val == 'ALL') {
            getQuestions()
            return true
        }
        props.show_progress()
        try {
            const result = val == 'Active' ? await props.get_active_questions() : await props.get_inactive_questions()
            setQuestions(result.data.questions)
        } catch (err) {
            props.show_error({
                message: "Unable to fetch questions"
            })
        }
        props.hide_progress()
    }

    const updateQuestion = async (update, questionId) => {
        props.show_progress()
        try {
            props.update_question({
                questionId: questionId,
                data: update
            })
        } catch (err) {
            props.show_error({
                message: "Unable to update"
            })
        }
        props.hide_progress()
    }

    return (
        <>
            <TemplateHeader header="Questions" more={
                <div className="col-auto text-right">
                    <a onClick={
                        e => props.history.push('/questions/add-question')
                    } className="btn btn-primary add-button ml-3">
                        <i className="fas fa-plus"></i>
                    </a>
                </div>
            } />
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <center>Filter</center>
                            <br />
                            <div className="row">
                                <div className="col-sm-4">
                                    <label htmlFor="">Filter by subject</label>
                                    <select className="form-control" onChange={
                                        e => {
                                            getBySubjects(e.target.value)
                                        }
                                    }>
                                        <option defaultValue>{_.isEmpty(subjects) ? '--loading--' : '--filter by subject--'}</option>
                                        {
                                            subjects.map((subject, index) => {
                                                return (
                                                    <option key={index + 1} value={subject._id}>{subject.subject}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-sm-4 d-flex align-items-center justify-content-center mt-4">
                                    OR
                                </div>
                                <div className="col-sm-4">
                                    <label htmlFor="">Filter by status</label>
                                    <select className="form-control" onChange={e => {
                                        filterByStatus(e.target.value)
                                    }}>
                                        <option value="ALL">All</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover table-center mb-0 datatable">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Subject</th>
                                            <th>Question</th>
                                            <th>Options</th>
                                            <th>Answer</th>
                                            <th>Added on</th>
                                            <th>Status</th>
                                            <th>Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            _.isEmpty(questions) &&
                                            <tr>
                                                <td colSpan={8}>
                                                    <center className={'mt-2'}><CircularProgress /></center>
                                                </td>
                                            </tr>
                                        }
                                        {
                                            questions && questions.map((object, index) => {
                                                return (
                                                    <tr key={index + 1}>
                                                        <td>{index + 1}</td>
                                                        <td>{object.subject.subject}</td>
                                                        <td>{object.question}</td>
                                                        <td>
                                                            A: {object.option_a}<br />
                                                            B: {object.option_b}<br />
                                                            C: {object.option_c}<br />
                                                            D: {object.option_d}<br />
                                                        </td>
                                                        <td>{object.answer}</td>
                                                        <td>{object.added_on}</td>
                                                        <td>
                                                            {
                                                                <BootstrapSwitchButton
                                                                    checked={object.is_active == 'Active'}
                                                                    onlabel=''
                                                                    offlabel=''
                                                                    size="sm"
                                                                    key={index + 1}
                                                                    onChange={(checked) => {
                                                                        updateQuestion({
                                                                            'is_active': checked ? 'Active' : 'Inactive'
                                                                        }, object._id)
                                                                    }}
                                                                />
                                                            }
                                                        </td>
                                                        <td>
                                                            <a onClick={
                                                                e => props.history.push('/question/edit/' + object._id)
                                                            } className="btn btn-sm bg-success-light mr-2">	<i className="far fa-edit mr-1"></i> Edit</a>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
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
        get_all_questions: () => dispatch(get_all_questions()),
        get_all_subjects: () => dispatch(get_all_subjects()),
        get_active_questions: () => dispatch(get_active_questions()),
        get_inactive_questions: () => dispatch(get_inactive_questions()),
        update_question: (payload) => dispatch(update_question(payload)),
        get_questions_by_subject: (payload) => dispatch(get_questions_by_subject(payload)),
        show_modal: (payload) => dispatch(show_modal(payload)),
        hide_modal: () => dispatch(hide_modal())
    }
}

export default connect(null, MapDispatchToProps)(Questions)