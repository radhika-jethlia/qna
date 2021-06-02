import Axios from 'axios'
import { GET_ALL_QUESTIONS, GET_QUESTIONS_BY_SUBJECT } from '../../utils/API'


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