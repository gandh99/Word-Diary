import {
    SHOW_SHARE_DIARY_POST_MODAL, HIDE_SHARE_DIARY_POST_MODAL
} from '../actionTypes'

const initialState = {
    displayShareDiaryPostModal: false,
    postToShare: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
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