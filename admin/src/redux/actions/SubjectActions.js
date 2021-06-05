import Axios from 'axios'
import {
    GET_ALL_SUBJECTS,
    ADD_SUBJECTS,
    UPDATE_SUBJECT,
    GET_SUBJECT_BY_ID
} from '../../utils/API'


export const get_all_subjects = () => {
    return (dispatch) => {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('jsonwebtoken')
            }
        }
        return Axios.get(GET_ALL_SUBJECTS, config)
    }
}

export const add_subject = (payload) => {
    return (dispatch) => {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('jsonwebtoken'),
                // 'Content-Type': 'multipart/form-data'
            }
        }
        return Axios.post(ADD_SUBJECTS, payload.data, config)
    }
}

export const update_subject = (payload) => {
    return (dispatch) => {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('jsonwebtoken'),
            }
        }
        return Axios.post(UPDATE_SUBJECT + payload.subjectId, payload.data, config)
    }
}

export const get_subject_by_id = (payload) => {
    return (dispatch) => {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('jsonwebtoken'),
            }
        }
        return Axios.get(GET_SUBJECT_BY_ID + payload.subjectId, config)
    }
}