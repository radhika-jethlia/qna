import axios from 'axios'
import {
    GAME_START,
    GAME_END,
    ADD_LIVE,
    DEDUCT_LIVE,
    REACHED_QUESTION
} from '../Constants'
import {
    GET_QUESTIONS_FROM_SUBJECT
} from '../../utils/API'

export const game_start = (payload) => {
    return {
        type: GAME_START,
        payload
    }
}

export const game_end = () => {
    return {
        type: GAME_END
    }
}

export const add_live = () => {
    return {
        type: ADD_LIVE
    }
}

export const deduct_live = () => {
    return {
        type: DEDUCT_LIVE
    }
}

export const update_reached_question = () => {
    return {
        type: REACHED_QUESTION
    }
}

export const get_random_questions_from_subject = (payload) => {
    return (dispatch) => {
        return axios.get(GET_QUESTIONS_FROM_SUBJECT + payload.subjectId)
    }
}