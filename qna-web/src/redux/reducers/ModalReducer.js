import {
    SHOW_MODAL, HIDE_MODAL
} from '../Constants'

const initialState = {
    isOpenModal: false,
    title: null,
    body: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                isOpenModal: true,
                title: action.payload.title,
                body: action.payload.body
            }

        case HIDE_MODAL:
            return {
                ...state,
                isOpenModal: false
            }

        default:
            return {
                ...initialState
            }
    }
}