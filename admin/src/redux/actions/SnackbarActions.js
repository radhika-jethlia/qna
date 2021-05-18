import {
    SUCCESS,
    WARNING,
    INFO,
    ERROR
} from '../ReduxConstants'

export const show_success = (payload) => {
    return {
        type: SUCCESS,
        payload
    }
}

export const show_warning = (payload) => {
    return {
        type: WARNING,
        payload
    }
}

export const show_info = (payload) => {
    return {
        type: INFO,
        payload
    }
}

export const show_error = (payload) => {
    return {
        type: ERROR,
        payload
    }
}