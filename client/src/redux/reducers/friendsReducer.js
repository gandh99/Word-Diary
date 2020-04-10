import {
    USER_SEARCH_SUCCESS,
    USER_SEARCH_FAIL,
    ISSUE_FRIEND_REQUEST_SUCCESS,
    ISSUE_FRIEND_REQUEST_FAIL
} from '../actionTypes'

const initialState = {
    userSearchResults: [],
    friendRequestRecipient: ''
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
        case ISSUE_FRIEND_REQUEST_SUCCESS:
            return {
                ...state,
                friendRequestRecipient: action.payload
            }
        case ISSUE_FRIEND_REQUEST_FAIL:
            return {
                ...state,
                friendRequestRecipient: ''
            }
        default:
            return state
    }
}