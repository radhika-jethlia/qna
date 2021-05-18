import {
    AUTH,
    LOGOUT
} from '../ReduxConstants'

const initialState = {
    isAuthorized: false
}

export default (state = initialState, action) => {
    switch (action.type == AUTH) {
        case AUTH:
            return {
                ...state,
                isAuthorized: true
            }

        case LOGOUT:
            localStorage.removeItem('jsonwebtoken')
            return {
                ...state,
                isAuthorized: false
            }
        default:
            return {
                state
            }
    }
}