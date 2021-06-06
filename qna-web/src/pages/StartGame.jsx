import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { game_end } from '../redux/actions/GameActions'
import _ from 'lodash'
import PropTypes from 'prop-types'
import {
    Container,
    Grid,
    Paper,
    LinearProgress,
    Box,
    Typography
} from '@material-ui/core'
import {
    BASE_URI
} from '../utils/API'
import './StartGame.css'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const StartGame = (props) => {
    const classes = useStyles()

    const [score, setScore] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState(1)
    const [maxQuestions, setMaxQuestions] = useState(20) //props.game.questions.length || 20
    const [lives, setLives] = useState(5)
    const [consecutiveWinnings, setConsecutiveWinnings] = useState(0)
    const [isCorrect, setIsCorrect] = useState([false, false, false, false])
    const [isInCorrect, setIsInCorrect] = useState([false, false, false, false])
    const [time, setTime] = useState(20)

    useEffect(() => {
        console.log(props.game.isGameRunning)
        if (!props.game.isGameRunning) {
            props.game_end()
            props.history.push('/start')
        }
        console.log(props.game)
    }, [])

    useEffect(() => {
        if (time > 0) {
            setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        }
        if (time == 0) {
            answerQuestion(null, props.game.questions[currentQuestion])
        }
    }, [time])

    function LinearProgressWithLabel(props) {
        return (
            <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                    <LinearProgress variant="determinate" {...props} />
                </Box>
                <Box minWidth={35}>
                    <Typography variant="body2" color="textSecondary">{`${Math.round(
                        props.value,
                    )}%`}</Typography>
                </Box>
            </Box>
        )
    }

    LinearProgressWithLabel.propTypes = {
        /**
         * The value of the progress indicator for the determinate and buffer variants.
         * Value between 0 and 100.
         */
        value: PropTypes.number.isRequired,
    }

    const answerQuestion = async (answer = null, question) => {
        if (answer === null) {
            setLives(lives - 1)
            setConsecutiveWinnings(0)
            setIsInCorrect([true, true, true, true])
            new Promise((resolve) => {
                resolve(
                    setTimeout(() => {
                        setIsInCorrect([false, false, false, false])
                        setCurrentQuestion(currentQuestion + 1)
                        setTime(20)
                    }, 800)
                )
            })
        } else {
            if (answer === question.answer) {
                setScore(score + 1)
                if ((consecutiveWinnings + 1) === 5) {
                    setLives(lives + 1)
                }
                setConsecutiveWinnings(consecutiveWinnings + 1)
            } else {
                setLives(lives - 1)
                setConsecutiveWinnings(0)
                setIsInCorrect([
                    answer === 'A',
                    answer === 'B',
                    answer === 'C',
                    answer === 'D',
                ])
            }

            setIsCorrect([
                question.answer === 'A',
                question.answer === 'B',
                question.answer === 'C',
                question.answer === 'D',
            ])

            new Promise((resolve) => {
                resolve(
                    setTimeout(() => {
                        setIsCorrect([false, false, false, false])
                        setIsInCorrect([false, false, false, false])
                        setCurrentQuestion(currentQuestion + 1)
                    }, 800)
                )
            })
        }
    }

    return (
        <>
            {
                props.game.isGameRunning &&
                <>
                    <Container>
                        <h3>{currentQuestion} / 20</h3>
                        <LinearProgressWithLabel value={(currentQuestion - 1) * 5} />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <p>Lives</p>
                                <p>
                                    {
                                        _.times(lives, (i) => {
                                            return (
                                                <FavoriteIcon key={i} htmlColor={'red'} />
                                            )
                                        })
                                    }
                                </p>
                            </Grid>
                            <Grid item xs={6}>
                                <p>Time: </p>
                                <p>{time}</p>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <div className="container">
                                    <img src={BASE_URI + '/' + props.game.questions[currentQuestion - 1].subject.file_name} alt="Subject image" style={{
                                        height: '8em',
                                        width: '100%',
                                        objectFit: 'cover',
                                        opacity: .2,
                                        borderTopLeftRadius: '20px',
                                        borderTopRightRadius: '20px'
                                    }} />
                                    <div className="centered">Score: {score}</div>
                                </div>
                                <Paper className={classes.paper}>{props.game.questions[currentQuestion - 1].question}</Paper>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} style={{
                            marginTop: '2em'
                        }}
                        >
                            <Grid item xs={6}>
                                <Paper onClick={
                                    e => answerQuestion('A', props.game.questions[currentQuestion])
                                } className={[classes.paper, isCorrect[0] ? 'correct' : '', isInCorrect[0] ? 'incorrect' : '']}>{props.game.questions[currentQuestion - 1].option_a}</Paper>
                            </Grid>

                            <Grid item xs={6}>
                                <Paper onClick={
                                    e => answerQuestion('B', props.game.questions[currentQuestion])
                                } className={[classes.paper, isCorrect[1] ? 'correct' : '', isInCorrect[1] ? 'incorrect' : '']}>{props.game.questions[currentQuestion - 1].option_b}</Paper>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Paper onClick={
                                    e => answerQuestion('C', props.game.questions[currentQuestion])
                                } className={[classes.paper, isCorrect[2] ? 'correct' : '', isInCorrect[2] ? 'incorrect' : '']}>{props.game.questions[currentQuestion - 1].option_c}</Paper>
                            </Grid>

                            <Grid item xs={6}>
                                <Paper onClick={
                                    e => answerQuestion('D', props.game.questions[currentQuestion])
                                } className={[classes.paper, isCorrect[3] ? 'correct' : '', isInCorrect[3] ? 'incorrect' : '']}>{props.game.questions[currentQuestion - 1].option_d}</Paper>
                            </Grid>
                        </Grid>
                        <Grid spacing={2}
                            container
                            style={{
                                marginTop: '3em'
                            }}>
                            <Grid item xs={12}>
                                <Paper className={classes.paper} onClick={
                                    e => {
                                        props.game_end()
                                        props.history.push('/')
                                    }
                                }>Quit game</Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </>
            }
        </>
    )
}

const MapStateToProps = (state) => {
    return {
        game: state.game
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        game_end: () => dispatch(game_end())
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(StartGame)