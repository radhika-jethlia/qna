import Axios from 'axios'
import { GET_ALL_SUBJECTS } from '../../utils/API'


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