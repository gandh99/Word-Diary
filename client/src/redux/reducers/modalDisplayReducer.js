import {
    SHOW_SHARE_DIARY_POST_MODAL, 
    HIDE_SHARE_DIARY_POST_MODAL,
    SHOW_ADD_DIARY_POST_MODAL,
    HIDE_ADD_DIARY_POST_MODAL,
    SHOW_ADD_FRIEND_MODAL,
    HIDE_ADD_FRIEND_MODAL
} from '../actionTypes'

const initialState = {
    displayShareDiaryPostModal: false,
    postToShare: {},
    displayAddDiaryPostModal: false,
    displayAddFriendModal: false
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
        default:
            return state
    }
}