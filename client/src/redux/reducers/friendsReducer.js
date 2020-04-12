import {
    USER_SEARCH_SUCCESS,
    USER_SEARCH_FAIL,
    ISSUE_FRIEND_REQUEST_SUCCESS,
    ISSUE_FRIEND_REQUEST_FAIL,
    RESPOND_TO_PENDING_FRIEND_REQUEST_SUCCESS,
    RESPOND_TO_PENDING_FRIEND_REQUEST_FAIL,
    GET_FRIEND_REQUESTS_ISSUED_TO_ME_FAIL,
    GET_FRIEND_REQUESTS_ISSUED_TO_ME_SUCCESS,
    GET_FRIENDS_SUCCESS,
    GET_FRIENDS_FAIL,
    UNFRIEND_SUCCESS,
    UNFRIEND_FAIL
} from '../actionTypes'

const initialState = {
    userSearchResults: [],
    friendRequestRecipient: '',
    friendRequestsIssuedToMe: [],
    responseToPendingRequest: {},
    allFriends: []
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
        case GET_FRIEND_REQUESTS_ISSUED_TO_ME_SUCCESS:
            return {
                ...state,
                friendRequestsIssuedToMe: action.payload
            }
        case GET_FRIEND_REQUESTS_ISSUED_TO_ME_FAIL:
            return {
                ...state,
                friendRequestsIssuedToMe: []
            }
        case GET_FRIENDS_SUCCESS:
            return {
                ...state,
                allFriends: action.payload
            }
        case GET_FRIENDS_FAIL:
            return {
                ...state,
                allFriends: []
            }
        case RESPOND_TO_PENDING_FRIEND_REQUEST_SUCCESS:
            return {
                ...state,
                responseToPendingRequest: action.payload
            }
        case RESPOND_TO_PENDING_FRIEND_REQUEST_FAIL:
            return {
                ...state,
                responseToPendingRequest: {}
            }
        case UNFRIEND_SUCCESS:
        case UNFRIEND_FAIL:
        default:
            return state
    }
}