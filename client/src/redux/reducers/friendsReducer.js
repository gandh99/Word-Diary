import {
    USER_SEARCH_SUCCESS,
    USER_SEARCH_FAIL,
} from '../actionTypes'

const initialState = {
    userSearchResults: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case USER_SEARCH_SUCCESS:
            return {
                ...state,
                userSearchResults: action.payload
            }
        case USER_SEARCH_FAIL:
            return {
                ...state,
                userSearchResults: []
            }
        default:
            return state
    }
}