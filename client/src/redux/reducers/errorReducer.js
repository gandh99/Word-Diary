import { GET_ERRORS, CLEAR_ERRORS } from '../actionTypes'

const initialState = {
    id: null,
    status: null,
    message: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return {
                id: action.payload.id,
                status: action.payload.status,
                message: action.payload.message,
            }
        case CLEAR_ERRORS:
            return {
                id: null,
                status: null,
                message: {}
            }
        default:
            return state
    }
}