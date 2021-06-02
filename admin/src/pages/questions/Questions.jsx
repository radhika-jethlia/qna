import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import TemplateHeader from '../components/template/TemplateHeader.jsx'
import { hide_modal, show_modal } from '../../redux/actions/ModalActions.js'
import {
    get_all_subjects
} from '../../redux/actions/SubjectActions.js'
import { show_error, show_success } from '../../redux/actions/SnackbarActions.js'
import { hide_progress, show_progress } from '../../redux/actions/ProgressAction.js'
import _ from 'lodash'
import {
    get_all_questions,
    get_questions_by_subject
} from '../../redux/actions/QuestionActions.js'

const Questions = (props) => {
    const [questions, setQuestions] = useState([])
    const [subjects, setSubjects] = useState([])
    const [selectedSubject, setSelectedSubject] = useState('')

    useEffect(() => {
        getQuestions()
        getSubjects()
    }, [])

    const getQuestions = async () => {
        props.show_progress()
        try {
            const result = await props.get_all_questions()
            setQuestions(result.data.questions)
        } catch (err) {
            props.show_error({
                message: "Unable to fetch questions"
            })
        }
        props.hide_progress()
    }

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

    const getBySubjects = async () => {
        props.show_progress()
        try {
            const result = await props.get_questions_by_subject({
                subject: selectedSubject
            })
            setQuestions(result.data.questions)
        } catch (err) {
            props.show_error({
                message: "Unable to fetch questions"
            })
        }
        props.hide_progress()
    }

    const filterByStatus = (val) => {

    }

    return (
        <>
            <TemplateHeader header="Questions" />
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <center>Filter</center>
                            <br />
                            <div className="row">
                                <div className="col-sm-4">
                                    <select className="form-control" onChange={
                                        e => {
                                            setSelectedSubject(e.target.value)
                                            getBySubjects()
                                        }
                                    }>
                                        <option>--filter by subject--</option>
                                        {
                                            subjects.map((subject, index) => {
                                                return (
                                                    <option {...selectedSubject === subject._id ? 'selected' : ''} value={subject._id}>{subject.subject}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-sm-4">
                                    <select className="form-control" onChange={e => filterByStatus(e.target.value)}>
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
                                            questions.map((object, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{object.subject}</td>
                                                        <td>{object.question}</td>
                                                        <td>
                                                            A: {object.option_a}<br />
                                                            B: {object.option_b}<br />
                                                            C: {object.option_c}<br />
                                                            D: {object.option_d}<br />
                                                        </td>
                                                        <td>{object.answer}</td>
                                                        <td>{object.added_on}</td>
                                                        <td>{object.is_active}</td>
                                                        <td>
                                                            <a href="edit-category.html" className="btn btn-sm bg-success-light mr-2">	<i className="far fa-edit mr-1"></i> Edit</a>
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
        get_questions_by_subject: (payload) => dispatch(get_questions_by_subject(payload)),
        show_modal: (payload) => dispatch(show_modal(payload)),
        hide_modal: () => dispatch(hide_modal())
    }
}

export default connect(null, MapDispatchToProps)(Questions)