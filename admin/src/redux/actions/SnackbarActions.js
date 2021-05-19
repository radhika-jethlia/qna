import {
    SUCCESS,
    WARNING,
    INFO,
    ERROR,
    HIDE_SUCCESS,
    HIDE_WARNING,
    HIDE_INFO,
    HIDE_ERROR
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

export const hide_success = () => {
    return {
        type: HIDE_SUCCESS
    }
}

export const hide_warning = () => {
    return {
        type: HIDE_WARNING
    }
}

export const hide_info = () => {
    return {
        type: HIDE_INFO
    }
}

export const hide_error = () => {
    return {
        type: HIDE_ERROR
    }
}