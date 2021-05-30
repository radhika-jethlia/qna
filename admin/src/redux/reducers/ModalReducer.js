import {
    SHOW_MODAL, HIDE_MODAL
} from '../ReduxConstants'

const initialState = {
    isOpenModal: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                isOpenModal: true,
                title: action.payload.title,
                formBody: action.payload.formBody,
                errors: action.payload.errors
            }

        case HIDE_MODAL:
            return {
                ...state,
                isOpenModal: false,
            }

        default:
            return {
                ...initialState
            }
    }
}