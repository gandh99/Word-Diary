import {
    USER_SEARCH_SUCCESS,
    USER_SEARCH_FAIL,
    ISSUE_FRIEND_REQUEST_SUCCESS,
    ISSUE_FRIEND_REQUEST_FAIL,
    GET_PENDING_FRIEND_REQUESTS_SUCCESS,
    GET_PENDING_FRIEND_REQUESTS_FAIL,
    RESPOND_TO_PENDING_REQUEST_SUCCESS,
    RESPOND_TO_PENDING_REQUEST_FAIL
} from '../actionTypes'

const initialState = {
    userSearchResults: [],
    friendRequestRecipient: '',
    pendingFriendRequests: [],
    responseToPendingRequest: {}
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
        case GET_PENDING_FRIEND_REQUESTS_SUCCESS:
            return {
                ...state,
                pendingFriendRequests: action.payload
            }
        case GET_PENDING_FRIEND_REQUESTS_FAIL:
            return {
                ...state,
                pendingFriendRequests: []
            }
        case RESPOND_TO_PENDING_REQUEST_SUCCESS:
            return {
                ...state,
                responseToPendingRequest: action.payload
            }
        case RESPOND_TO_PENDING_REQUEST_FAIL:
            return {
                ...state,
                responseToPendingRequest: {}
            }
        default:
            return state
    }
}