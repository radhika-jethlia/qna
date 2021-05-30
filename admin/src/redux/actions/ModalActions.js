import { SHOW_MODAL, HIDE_MODAL } from '../ReduxConstants'

export const show_modal = (payload) => {
    return {
        type: SHOW_MODAL,
        payload
    }
}

export const hide_modal = (payload) => {
    return {
        type: HIDE_MODAL,
        payload
    }
}