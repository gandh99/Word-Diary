import {GET_ERRORS, CLEAR_ERRORS} from '../actionTypes'

export const returnErrors = (id, status, message) => {
    return {
        type: GET_ERRORS,
        payload: {id, status, message}
    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}