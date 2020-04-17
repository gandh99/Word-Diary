import axios from '../../config/axiosConfig'
import {
    TRANSLATE_SUCCESS,
    TRANSLATE_FAIL,
    ADD_DIARY_POST_SUCCESS,
    ADD_DIARY_POST_FAIL,
    GET_DIARY_POST_SUCCESS,
    GET_DIARY_POST_FAIL,
    UPDATE_DIARY_POST_SUCCESS,
    UPDATE_DIARY_POST_FAIL,
    DELETE_DIARY_POST_SUCCESS,
    DELETE_DIARY_POST_FAIL,
    SHARE_DIARY_POST_SUCCESS,
    SHARE_DIARY_POST_FAIL,
    GET_DIARY_POSTS_SHARED_WITH_ME_SUCCESS,
    GET_DIARY_POSTS_SHARED_WITH_ME_FAIL,
    RESPOND_TO_DIARY_POST_SHARED_WITH_ME_SUCCESS,
    RESPOND_TO_DIARY_POST_SHARED_WITH_ME_FAIL,
    DELETE_SHARED_DIARY_POST_SUCCESS,
    DELETE_SHARED_DIARY_POST_FAIL,
} from '../actionTypes'
import { tokenConfig } from './authenticationActions'
import { history } from '../../config/history'
import { useErrorDispatch } from '../../utils/errorHandler'

export const translateAction = (textData, callback) => (dispatch, getState) => {
    axios
        .post('/diary/translate', textData, tokenConfig(getState))
        .then(res => {
            const translatedText = res.data.data

            dispatch({
                type: TRANSLATE_SUCCESS,
                payload: translatedText
            })
            callback(translatedText)
        })
        .catch(err => {
            useErrorDispatch(
                dispatch,
                err.response.status,
                err.response.status,
                err.response.data.data,
                TRANSLATE_FAIL,
                err.response.data
            )
        })
}

export const addDiaryPostAction = (postData, successCallback, errorCallback) => (dispatch, getState) => {
    axios
        .post('/diary/add-post', postData, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_DIARY_POST_SUCCESS,
                payload: res.data.data
            })
            successCallback('Successfully added diary post.')
        })
        .catch(err => {
            useErrorDispatch(
                dispatch,
                err.response.status,
                err.response.status,
                err.response.data.data,
                ADD_DIARY_POST_FAIL,
                err.response.data
            )
            errorCallback(err.response.data.data)
            history.push('/login')
        })
}

export const getDiaryPostsAction = () => (dispatch, getState) => {
    axios
        .get('/diary/get-post', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_DIARY_POST_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            useErrorDispatch(
                dispatch,
                err.response.status,
                err.response.status,
                err.response.data.data,
                GET_DIARY_POST_FAIL,
                err.response.data
            )
        })
}

export const updateDiaryPostAction = (postData) => (dispatch, getState) => {
    axios
        .put('/diary/update-post', postData, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: UPDATE_DIARY_POST_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            useErrorDispatch(
                dispatch,
                err.response.status,
                err.response.status,
                err.response.data.data,
                UPDATE_DIARY_POST_FAIL,
                err.response.data
            )
        })
}

export const deleteDiaryPostAction = (postData, done) => (dispatch, getState) => {
    const { _id } = postData

    axios
        .delete(`/diary/delete-post/${_id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_DIARY_POST_SUCCESS,
                payload: res.data.data
            })
            done()
        })
        .catch(err => {
            useErrorDispatch(
                dispatch,
                err.response.status,
                err.response.status,
                err.response.data.data,
                DELETE_DIARY_POST_FAIL,
                err.response.data
            )
        })
}

export const shareDiaryPostAction = (sharedPostData) => (dispatch, getState) => {
    axios
        .post('/diary/share-post', sharedPostData, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: SHARE_DIARY_POST_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            useErrorDispatch(
                dispatch,
                err.response.status,
                err.response.status,
                err.response.data.data,
                SHARE_DIARY_POST_FAIL,
                err.response.data
            )
        })
}

export const getDiaryPostsSharedWithMeAction = () => (dispatch, getState) => {
    axios
        .get('/diary/get-posts-shared-with-me', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_DIARY_POSTS_SHARED_WITH_ME_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            useErrorDispatch(
                dispatch,
                err.response.status,
                err.response.status,
                err.response.data.data,
                GET_DIARY_POSTS_SHARED_WITH_ME_FAIL,
                err.response.data
            )
        })
}

export const respondToDiaryPostSharedWithMeAction = (responseData) => (dispatch, getState) => {
    const originalPost = responseData.sharedPost

    axios
        .put('/diary/respond-to-post-shared-with-me', responseData, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: RESPOND_TO_DIARY_POST_SHARED_WITH_ME_SUCCESS,
                payload: {
                    originalPost,
                    newPost: res.data.data
                }
            })
        })
        .catch(err => {
            useErrorDispatch(
                dispatch,
                err.response.status,
                err.response.status,
                err.response.data.data,
                RESPOND_TO_DIARY_POST_SHARED_WITH_ME_FAIL,
                err.response.data
            )
        })
}

export const deleteSharedDiaryPostAction = (postData, done) => (dispatch, getState) => {
    const { _id } = postData

    axios
        .delete(`/diary/delete-shared-post/${_id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_SHARED_DIARY_POST_SUCCESS,
                payload: res.data.data
            })
            done()
        })
        .catch(err => {
            useErrorDispatch(
                dispatch,
                err.response.status,
                err.response.status,
                err.response.data.data,
                DELETE_SHARED_DIARY_POST_FAIL,
                err.response.data
            )
        })
}