import {
    GAME_START,
    GAME_END,
    ADD_LIVE,
    DEDUCT_LIVE,
    REACHED_QUESTION
} from '../Constants'

const initialState = {
    isGameRunning: false,
    reached_question: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GAME_START:
            return {
                isGameRunning: true,
                total_lives: 5,
                questions: action.payload.questions,
                reached_question: 1
            }

        case GAME_END:
            return {
                isGameRunning: false
            }

        case ADD_LIVE:
            return {
                total_lives: 1
            }

        case DEDUCT_LIVE:
            return {
                total_lives: 0
            }

        case REACHED_QUESTION:
            return {
                reached_question: 1
            }

        default:
            return {
                ...state
            }
    }
}