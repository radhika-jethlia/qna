import Axios from 'axios'
import {
    GET_ACTIVE_SUBJECTS
} from '../../utils/API'


export const get_active_subjects = () => {
    return (dispatch) => {
        return Axios.get(GET_ACTIVE_SUBJECTS)
    }
}