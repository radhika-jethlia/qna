import {
    PROGRESS_OPEN,
    PROGRESS_CLOSE
} from '../Constants'

export const show_progress = () => {
    return {
        type: PROGRESS_OPEN
    }
}

export const hide_progress = () => {
    return {
        type: PROGRESS_CLOSE
    }
}