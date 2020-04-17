import {
    GET_NOTIFICATIONS_FOR_RECEIVED_FRIEND_REQUESTS_SUCCESS,
    GET_NOTIFICATIONS_FOR_RECEIVED_FRIEND_REQUESTS_FAIL,
    DELETE_NOTIFICATIONS_FOR_RECEIVED_FRIEND_REQUESTS_SUCCESS,
    DELETE_NOTIFICATIONS_FOR_RECEIVED_FRIEND_REQUESTS_FAIL,
    GET_DIARY_POSTS_SHARED_WITH_ME_SUCCESS,
    GET_DIARY_POSTS_SHARED_WITH_ME_FAIL,
    DELETE_NOTIFICATIONS_FOR_SHARED_DIARY_POSTS_SUCCESS,
    DELETE_NOTIFICATIONS_FOR_SHARED_DIARY_POSTS_FAIL
} from '../actionTypes'

const initialState = {
    receivedFriendRequests: [],
    diaryPostsSharedWithMe: []
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
        case GET_DIARY_POSTS_SHARED_WITH_ME_SUCCESS:
            return {
                ...state,
                diaryPostsSharedWithMe: action.payload
            }
        case GET_DIARY_POSTS_SHARED_WITH_ME_FAIL:
            return {
                ...state,
                diaryPostsSharedWithMe: []
            }
        case DELETE_NOTIFICATIONS_FOR_SHARED_DIARY_POSTS_SUCCESS:
            return {
                ...state,
                diaryPostsSharedWithMe: []
            }
        case DELETE_NOTIFICATIONS_FOR_SHARED_DIARY_POSTS_FAIL:
            return {
                ...state,
            }
        default:
            return state
    }
}