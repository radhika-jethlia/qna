import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
    get_all_subjects
} from '../redux/actions/SubjectActions'
import {
    get_all_questions
} from '../redux/actions/QuestionActions'
import {
    get_all_sliders
} from '../redux/actions/SliderActions'

let Dashboard = (props) => {

    const [subjects, setSubjects] = useState('...')
    const [questions, setQuestions] = useState('...')
    const [sliders, setSliders] = useState('...')

    useEffect(() => {
        getCounts()
    }, [])

    const getCounts = async () => {
        try {
            const subjectResult = await props.get_all_subjects()
            const questionsResult = await props.get_all_questions()
            const slidersResult = await props.get_all_sliders()
            setSubjects(subjectResult.data.subjectsList.length)
            setQuestions(questionsResult.data.questions.length)
            setSliders(slidersResult.data.adsList.length)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className="page-header">
                <div className="row">
                    <div className="col-12">
                        <h3 className="page-title">Welcome Admin!</h3>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-3 col-sm-6 col-12" onClick={
                    e => props.history.push('/subjects/add')
                }>
                    <div className="card">
                        <div className="card-body">
                            <div className="dash-widget-header">
                                <span className="dash-widget-icon bg-primary">
                                    <i className="fa fa-superscript"></i>
                                </span>
                                <div className="dash-widget-info">
                                    <h3>{subjects}</h3>
                                    <h6 className="text-muted">Subjects</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12" onClick={
                    e => props.history.push('/questions/add-question')
                }>
                    <div className="card">
                        <div className="card-body">
                            <div className="dash-widget-header">
                                <span className="dash-widget-icon bg-primary">
                                    <i className="fa fa-question-circle"></i>
                                </span>
                                <div className="dash-widget-info">
                                    <h3>{questions}</h3>
                                    <h6 className="text-muted">Questions</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12" onClick={
                    e => props.history.push('/sliders/add')
                }>
                    <div className="card">
                        <div className="card-body">
                            <div className="dash-widget-header">
                                <span className="dash-widget-icon bg-primary">
                                    <i className="fa fa-camera"></i>
                                </span>
                                <div className="dash-widget-info">
                                    <h3>{sliders}</h3>
                                    <h6 className="text-muted">Sliders</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12" onClick={
                    e => props.history.push('/password')
                }>
                    <div className="card">
                        <div className="card-body">
                            <div className="dash-widget-header">
                                <span className="dash-widget-icon bg-primary">
                                    <i className="fa fa-cog"></i>
                                </span>
                                <div className="dash-widget-info">
                                    <h3>View</h3>
                                    <h6 className="text-muted">Settings</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const MapStateToProps = (state) => {
    return {
        authentication: state.authentication
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        get_all_subjects: () => dispatch(get_all_subjects()),
        get_all_questions: () => dispatch(get_all_questions()),
        get_all_sliders: () => dispatch(get_all_sliders())
    }
}

Dashboard = withRouter(Dashboard)
export default connect(MapStateToProps, MapDispatchToProps)(Dashboard)