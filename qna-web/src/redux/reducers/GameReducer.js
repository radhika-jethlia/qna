import {
    GAME_START,
    GAME_END
} from '../Constants'

const initialState = {
    isGameRunning: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GAME_START:
            return {
                isGameRunning: true
            }

        case GAME_END:
            return {
                isGameRunning: false
            }

        default:
            return {
                ...state
            }
    }
}