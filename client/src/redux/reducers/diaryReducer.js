import {
    TRANSLATE_SUCCESS,
    TRANSLATE_FAIL,
    ADD_DIARY_POST_SUCCESS,
    ADD_DIARY_POST_FAIL,
    GET_DIARY_POST_SUCCESS,
    GET_DIARY_POST_FAIL,
    UPDATE_DIARY_POST_SUCCESS,
    UPDATE_DIARY_POST_FAIL,
    DELETE_DIARY_POST_SUCCESS,
    DELETE_DIARY_POST_FAIL,
    SHARE_DIARY_POST_SUCCESS,
    SHARE_DIARY_POST_FAIL,
} from '../actionTypes'

const initialState = {
    translatedText: '',
    affectedDiaryPost: {},
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
                affectedDiaryPost: action.payload,
                allDiaryPosts: [...state.allDiaryPosts, action.payload]
            }
        case ADD_DIARY_POST_FAIL:
            return {
                ...state,
                affectedDiaryPost: {}
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
        case UPDATE_DIARY_POST_SUCCESS:
            return {
                ...state,
                affectedDiaryPost: action.payload,
                allDiaryPosts: state.allDiaryPosts.map(
                    post => (post._id === action.payload.creator) ? action.payload : post)
            }
        case UPDATE_DIARY_POST_FAIL:
            return {
                ...state,
                affectedDiaryPost: {}
            }
        case DELETE_DIARY_POST_SUCCESS:
            return {
                ...state,
                affectedDiaryPost: action.payload,
                allDiaryPosts: state.allDiaryPosts.filter(
                    post => post._id !== action.payload._id
                )
            }
        case DELETE_DIARY_POST_FAIL:
            return {
                ...state,
                affectedDiaryPost: {}
            }
        case SHARE_DIARY_POST_SUCCESS:
            return {
                ...state,
                affectedDiaryPost: action.payload
            }
        case SHARE_DIARY_POST_FAIL:
            return {
                ...state,
                affectedDiaryPost: {}
            }
        default:
            return state
    }
}