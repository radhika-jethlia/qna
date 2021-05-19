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

const initialState = {
    success: {
        isOpen: false,
        message: null
    },
    warning: {
        isOpen: false,
        message: null
    },
    info: {
        isOpen: false,
        message: null
    },
    error: {
        isOpen: false,
        message: null
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS:
            return {
                ...initialState,
                success: {
                    isOpen: true,
                    message: action.payload.message
                }
            }

        case WARNING:
            return {
                ...initialState,
                warning: {
                    isOpen: true,
                    message: action.payload.message
                }
            }

        case INFO:
            return {
                ...initialState,
                info: {
                    isOpen: true,
                    message: action.payload.message
                }
            }

        case ERROR:
            return {
                ...initialState,
                error: {
                    isOpen: true,
                    message: action.payload.message
                }
            }
        case HIDE_SUCCESS:
            return {
                ...initialState,
                success: {
                    isOpen: false,
                    message: ''
                }
            }

        case HIDE_WARNING:
            return {
                ...initialState,
                warning: {
                    isOpen: false,
                    message: ''
                }
            }

        case HIDE_INFO:
            return {
                ...initialState,
                info: {
                    isOpen: false,
                    message: ''
                }
            }

        case HIDE_ERROR:
            return {
                ...initialState,
                error: {
                    isOpen: false,
                    message: ''
                }
            }

        default:
            return {
                ...state
            }
    }
}