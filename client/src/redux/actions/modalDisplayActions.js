import { SHOW_SHARE_DIARY_POST_MODAL, HIDE_SHARE_DIARY_POST_MODAL } from "../actionTypes"

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