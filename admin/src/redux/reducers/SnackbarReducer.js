import {
    SUCCESS,
    WARNING,
    INFO,
    ERROR
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

        default:
            return {
                ...state
            }
    }
}