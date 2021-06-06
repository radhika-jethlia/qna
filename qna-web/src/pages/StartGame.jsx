import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { game_end } from '../redux/actions/GameActions'
import _ from 'lodash'

const StartGame = (props) => {

    useEffect(() => {
        console.log(props.game.isGameRunning)
        if (!props.game.isGameRunning) {
            props.game_end()
            props.history.push('/start')
        }
        console.log(props.game)
    }, [])

    return (
        <>
            {
                props.game.isGameRunning &&
                <>
                    <h1>Question {props.game.reached_question}</h1>
                    <p>Lives:
                    {
                            _.times(props.game.total_lives, () => {
                                return (
                                    <FavoriteIcon htmlColor={'red'} />
                                )
                            })
                        }
                        <p>{props.game.questions[props.game.reached_question - 1]}</p>
                    </p>
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