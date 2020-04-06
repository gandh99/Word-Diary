import { TRANSLATE_SUCCESS, TRANSLATE_FAIL } from '../actionTypes'

const initialState = {
    translatedText: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case TRANSLATE_SUCCESS:
            return {
                ...state,
                translatedText: action.payload
            }
        case TRANSLATE_FAIL:
            return {
                ...state,
                translatedText: ''
            }
        default:
            return state
    }
}