import Axios from 'axios'
import {
    GET_ALL_QUESTIONS,
    GET_QUESTIONS_BY_SUBJECT,
    GET_ACTIVE_QUESTIONS,
    GET_INACTIVE_QUESTIONS,
    UPDATE_QUESTION,
    ADD_QUESTION
} from '../../utils/API'


export const get_all_questions = () => {
    return (dispatch) => {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('jsonwebtoken')
            }
        }
        return Axios.get(GET_ALL_QUESTIONS, config)
    }
}

export const get_questions_by_subject = (payload) => {
    return (dispatch) => {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('jsonwebtoken')
            }
        }
        return Axios.get(GET_QUESTIONS_BY_SUBJECT + '' + payload.subject, config)
    }
}

export const get_active_questions = () => {
    return (dispatch) => {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('jsonwebtoken')
            }
        }
        return Axios.get(GET_ACTIVE_QUESTIONS, config)
    }
}

export const get_inactive_questions = () => {
    return (dispatch) => {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('jsonwebtoken')
            }
        }
        return Axios.get(GET_INACTIVE_QUESTIONS, config)
    }
}

export const update_question = (payload) => {
    return (dispatch) => {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('jsonwebtoken')
            }
        }
        return Axios.post(UPDATE_QUESTION + '' + payload.questionId, payload.data, config)
    }
}

export const add_question = (payload) => {
    return (dispatch) => {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('jsonwebtoken')
            }
        }
        return Axios.post(ADD_QUESTION, payload.data, config)
    }
}