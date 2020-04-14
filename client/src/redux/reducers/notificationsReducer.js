import {
    GET_NOTIFICATIONS_FOR_RECEIVED_FRIEND_REQUESTS_SUCCESS,
    GET_NOTIFICATIONS_FOR_RECEIVED_FRIEND_REQUESTS_FAIL,
    DELETE_NOTIFICATIONS_FOR_RECEIVED_FRIEND_REQUESTS_SUCCESS,
    DELETE_NOTIFICATIONS_FOR_RECEIVED_FRIEND_REQUESTS_FAIL
} from '../actionTypes'

const initialState = {
    receivedFriendRequests: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_NOTIFICATIONS_FOR_RECEIVED_FRIEND_REQUESTS_SUCCESS:
            return {
                ...state,
                receivedFriendRequests: action.payload
            }
        case GET_NOTIFICATIONS_FOR_RECEIVED_FRIEND_REQUESTS_FAIL:
            return {
                ...state,
                receivedFriendRequests: []
            }
        case DELETE_NOTIFICATIONS_FOR_RECEIVED_FRIEND_REQUESTS_SUCCESS:
            return {
                ...state,
                receivedFriendRequests: []
            }
        case DELETE_NOTIFICATIONS_FOR_RECEIVED_FRIEND_REQUESTS_FAIL:
            return {
                ...state,
            }
        default:
            return state
    }
}