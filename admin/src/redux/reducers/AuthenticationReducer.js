import {
    AUTH,
    LOGOUT
} from '../ReduxConstants'
import jwt from 'jsonwebtoken'

const initialState = {
    isAuthorized: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH:
            let decoded = jwt.decode(action.payload)
            let dateNow = new Date()
            return {
                ...state,
                isAuthorized: !((decoded.exp * 1 * 1000) < dateNow.getTime())
            }

        case LOGOUT:
            localStorage.removeItem('jsonwebtoken')
            return {
                ...state,
                isAuthorized: false
            }
        default:
            return {
                ...state
            }
    }
}