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
import './StartScreen.css'

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
                <h2 className={'center'}>Start game?</h2>
                <p className={'center'}>Selected topic: {props.subject.subject}</p>
                <h3 className={'center'}>Game Rules</h3>
                <ul className={'lists'}>
                    <li>Answer the questions as fast as you can.</li>
                    <li>You've 20 seconds to answer each question.</li>
                    <li>You have 5 lives.</li>
                    <li>For 5 consecutive correct answers you will gain one life.</li>
                    <li>The faster you answer, the more points you earn.</li>
                </ul>
                <br />
                <button className={'center'} onClick={
                    e => getMyQuestions(props.subject._id)
                }>LET'S PLAY</button>
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