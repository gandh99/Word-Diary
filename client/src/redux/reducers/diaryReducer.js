import { TRANSLATE_SUCCESS, TRANSLATE_FAIL, ADD_DIARY_POST_SUCCESS, ADD_DIARY_POST_FAIL } from '../actionTypes'

const initialState = {
    translatedText: '',
    diaryPost: {}
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
        case ADD_DIARY_POST_SUCCESS:
            return {
                ...state,
                diaryPost: action.payload
            }
        case ADD_DIARY_POST_FAIL:
            return {
                ...state,
                diaryPost: {}
            }
        default:
            return state
    }
}