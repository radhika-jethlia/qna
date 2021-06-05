import {
    PROGRESS_OPEN,
    PROGRESS_CLOSE
} from '../Constants'

const initialState = {
    isOpen: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case PROGRESS_OPEN:
            return {
                isOpen: true
            }

        case PROGRESS_CLOSE:
            return {
                isOpen: false
            }

        default:
            return {
                ...state
            }
    }
}