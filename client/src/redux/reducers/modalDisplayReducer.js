import {
    SHOW_SHARE_DIARY_POST_MODAL,
    HIDE_SHARE_DIARY_POST_MODAL,
    SHOW_ADD_DIARY_POST_MODAL,
    HIDE_ADD_DIARY_POST_MODAL,
    SHOW_ADD_FRIEND_MODAL,
    HIDE_ADD_FRIEND_MODAL,
    SHOW_FRIENDS_DIARY_POSTS_MODAL,
    HIDE_FRIENDS_DIARY_POSTS_MODAL
} from '../actionTypes'

const initialState = {
    // For sharing a diary post
    displayShareDiaryPostModal: false,
    postToShare: {},

    // For displaying a friend's diary posts
    displayFriendsDiaryPostsModal: false,
    friend: {},

    // The rest
    displayAddDiaryPostModal: false,
    displayAddFriendModal: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_ADD_DIARY_POST_MODAL:
            return {
                ...state,
                displayAddDiaryPostModal: true,
            }
        case HIDE_ADD_DIARY_POST_MODAL:
            return {
                ...state,
                displayAddDiaryPostModal: false,
            }
        case SHOW_SHARE_DIARY_POST_MODAL:
            return {
                ...state,
                displayShareDiaryPostModal: true,
                postToShare: action.payload
            }
        case HIDE_SHARE_DIARY_POST_MODAL:
            return {
                ...state,
                displayShareDiaryPostModal: false,
                postToShare: {}
            }
        case SHOW_ADD_FRIEND_MODAL:
            return {
                ...state,
                displayAddFriendModal: true,
            }
        case HIDE_ADD_FRIEND_MODAL:
            return {
                ...state,
                displayAddFriendModal: false,
            }
        case SHOW_FRIENDS_DIARY_POSTS_MODAL:
            return {
                ...state,
                friend: action.payload,
                displayFriendsDiaryPostsModal: true,
            }
        case HIDE_FRIENDS_DIARY_POSTS_MODAL:
            return {
                ...state,
                displayFriendsDiaryPostsModal: false,
            }
        default:
            return state
    }
}