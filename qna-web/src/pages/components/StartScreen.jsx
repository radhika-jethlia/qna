import React from 'react'
import { connect } from 'react-redux'
import {
    show_progress,
    hide_progress
} from '../../redux/actions/ProgressAction'
import {
    Grow,
    Paper
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
    game_start,
    get_random_questions_from_subject,
    get_random_questions
} from '../../redux/actions/GameActions'
import { withRouter } from 'react-router'
import './StartScreen.css'
import _ from 'lodash'

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(1),
        paddingTop: theme.spacing(5),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(5)
    },
}));

let StartScreen = (props) => {
    const classes = useStyles()

    const getMyQuestions = async (subjectId) => {
        props.show_progress()
        try {
            const result = await props.get_random_questions_from_subject({
                subjectId: subjectId
            })
            result.data.questions.length == 0 && alert('No questions found from the selected topic')
            result.data.questions.length > 0 && props.game_start({
                questions: result.data.questions
            }) && props.history.push('/play')
        } catch (err) {
            console.log(err)
        }
        props.hide_progress()
        props.history.push('/play')
    }

    const getRandomQuestions = async () => {
        props.show_progress()
        try {
            const result = await props.get_random_questions()
            result.data.questions.length == 0 && alert('No questions found from the selected topic')
            result.data.questions.length > 0 && props.game_start({
                questions: result.data.questions
            }) && props.history.push('/play')
        } catch (err) {
            console.log(err)
        }
        props.hide_progress()
    }

    return (
        <Grow in={true} style={{ transitionDelay: '50ms' }}>
            <Paper elevation={4} className={classes.paper}>
                <h2 className={'center'}>Start game?</h2>
                <p className={'center'}>Selected topic: {!_.isUndefined(props.subject.subject) ? props.subject.subject : props.subject}</p>
                <h3 className={'center'}>Game Rules</h3>
                <center>
                    <ul className={'lists'}>
                        <li>Answer the questions as fast as you can.</li>
                        <li>You've 20 seconds to answer each question.</li>
                        <li>You have 5 lives.</li>
                        <li>For 5 consecutive correct answers you will gain one life.</li>
                        <li>The faster you answer, the more points you earn.</li>
                    </ul>
                    <br />
                    <button className={'center'} onClick={
                        e => {
                            e.preventDefault()
                            !_.isUndefined(props.subject.subject) && getMyQuestions(props.subject._id)
                            _.isUndefined(props.subject.subject) && getRandomQuestions()
                        }
                    }>LET'S PLAY</button>
                </center>
            </Paper>
        </Grow>
    )
}

const MapDispatchToProps = (dispatch) => {
    return {
        show_progress: () => dispatch(show_progress()),
        hide_progress: () => dispatch(hide_progress()),
        get_random_questions_from_subject: (payload) => dispatch(get_random_questions_from_subject(payload)),
        get_random_questions: () => dispatch(get_random_questions()),
        game_start: (payload) => dispatch(game_start(payload))
    }
}
StartScreen = withRouter(StartScreen)
export default connect(null, MapDispatchToProps)(StartScreen)