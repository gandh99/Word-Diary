import {
    SHOW_SHARE_DIARY_POST_MODAL,
    HIDE_SHARE_DIARY_POST_MODAL,
    SHOW_ADD_DIARY_POST_MODAL,
    HIDE_ADD_DIARY_POST_MODAL,
    SHOW_ADD_FRIEND_MODAL,
    HIDE_ADD_FRIEND_MODAL
} from "../actionTypes"

export const showAddDiaryPostModal = () => dispatch => {
    dispatch({
        type: SHOW_ADD_DIARY_POST_MODAL,
        payload: null
    })
}

export const hideAddDiaryPostModal = () => dispatch => {
    dispatch({
        type: HIDE_ADD_DIARY_POST_MODAL,
        payload: null
    })
}

export const showShareDiaryPostModal = (post) => dispatch => {
    dispatch({
        type: SHOW_SHARE_DIARY_POST_MODAL,
        payload: post
    })
}

export const hideShareDiaryPostModal = () => dispatch => {
    dispatch({
        type: HIDE_SHARE_DIARY_POST_MODAL,
        payload: null
    })
} 

export const showAddFriendModal = () => dispatch => {
    dispatch({
        type: SHOW_ADD_FRIEND_MODAL,
        payload: null
    })
}

export const hideAddFriendModal = () => dispatch => {
    dispatch({
        type: HIDE_ADD_FRIEND_MODAL,
        payload: null
    })
}