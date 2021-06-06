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
    get_random_questions_from_subject
} from '../../redux/actions/GameActions'
import { withRouter } from 'react-router'

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(1),
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
            props.game_start({
                questions: result.data.questions
            })
        } catch (err) {
            console.log(err)
        }
        props.hide_progress()
        props.history.push('/play')
    }

    return (
        <Grow in={true} style={{ transitionDelay: '50ms' }}>
            <Paper elevation={4} className={classes.paper}>
                Start game?<br />
                Selected topic: {props.subject.subject}<br />
                Game Rules
            <ul>
                    <li>Answer the questions as fast as you can.</li>
                    <li>You've 20 seconds to answer each question.</li>
                    <li>You have 5 lives.</li>
                    <li>For 5 consecutive correct answers you will gain one life.</li>
                    <li>The faster you answer, the more points you earn.</li>
                </ul>
                <br />
                <h4 onClick={
                    e => getMyQuestions(props.subject._id)
                }>LET'S PLAY</h4>
            </Paper>
        </Grow>
    )
}

const MapDispatchToProps = (dispatch) => {
    return {
        show_progress: () => dispatch(show_progress()),
        hide_progress: () => dispatch(hide_progress()),
        get_random_questions_from_subject: (payload) => dispatch(get_random_questions_from_subject(payload)),
        game_start: (payload) => dispatch(game_start(payload))
    }
}
StartScreen = withRouter(StartScreen)
export default connect(null, MapDispatchToProps)(StartScreen)