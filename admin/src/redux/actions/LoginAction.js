import {
    AUTH,
    LOGOUT
} from '../ReduxConstants'
import Axios from 'axios'
import {
    PROCESS_LOGIN
} from '../../utils/API.js'

export const action_check_login = (payload) => {
    return {
        type: AUTH,
        payload
    }
}

export const action_login = (payload) => {
    return (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return Axios.post(PROCESS_LOGIN, payload, config)
    }
}

export const action_logout = () => {
    return {
        type: LOGOUT
    }
}