import Axios from 'axios'
import {
    GET_ACTIVE_SLIDERS,
    GET_SLIDER_BY_ID,
    GET_ALL_SLIDERS,
    UPDATE_SLIDER,
    ADD_SLIDER
} from '../../utils/API'


export const get_active_sliders = () => {
    return (dispatch) => {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('jsonwebtoken')
            }
        }
        return Axios.get(GET_ACTIVE_SLIDERS, config)
    }
}

export const get_slider_by_id = (payload) => {
    return (dispatch) => {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('jsonwebtoken'),
            }
        }
        return Axios.get(GET_SLIDER_BY_ID + payload.sliderId, config)
    }
}

export const get_all_sliders = () => {
    return (dispatch) => {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('jsonwebtoken')
            }
        }
        return Axios.get(GET_ALL_SLIDERS, config)
    }
}

export const add_slider = (payload) => {
    return (dispatch) => {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('jsonwebtoken')
            }
        }
        return Axios.post(ADD_SLIDER, payload.data, config)
    }
}

export const update_slider = (payload) => {
    return (dispatch) => {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('jsonwebtoken'),
            }
        }
        return Axios.post(UPDATE_SLIDER + payload.sliderId, payload.data, config)
    }
}