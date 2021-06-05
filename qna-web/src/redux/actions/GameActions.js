import {
    GAME_START,
    GAME_END
} from '../Constants'

export const game_start = () => {
    return {
        type: GAME_START
    }
}

export const game_end = () => {
    return {
        type: GAME_END
    }
}