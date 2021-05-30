import { PASSWORD_UPDATE } from "../../utils/API"
import Axios from 'axios'

export const change_password = (payload) => {
    return (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('jsonwebtoken')
            }
        }
        return Axios.post(PASSWORD_UPDATE, payload, config)
    }
}