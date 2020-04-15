import {
    SHOW_SHARE_DIARY_POST_MODAL, 
    HIDE_SHARE_DIARY_POST_MODAL,
    SHOW_ADD_DIARY_POST_MODAL,
    HIDE_ADD_DIARY_POST_MODAL
} from '../actionTypes'

const initialState = {
    displayShareDiaryPostModal: false,
    postToShare: {},
    displayAddDiaryPostModal: false
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
        default:
            return state
    }
}