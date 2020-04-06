import {
    TRANSLATE_SUCCESS,
    TRANSLATE_FAIL,
    ADD_DIARY_POST_SUCCESS,
    ADD_DIARY_POST_FAIL,
    GET_DIARY_POST_SUCCESS,
    GET_DIARY_POST_FAIL
} from '../actionTypes'

const initialState = {
    translatedText: '',
    newDiaryPost: {},
    allDiaryPosts: []
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
                newDiaryPost: action.payload
            }
        case ADD_DIARY_POST_FAIL:
            return {
                ...state,
                newDiaryPost: {}
            }
        case GET_DIARY_POST_SUCCESS:
            return {
                ...state,
                allDiaryPosts: action.payload
            }
        case GET_DIARY_POST_FAIL:
            return {
                ...state,
                allDiaryPosts: []
            }
        default:
            return state
    }
}