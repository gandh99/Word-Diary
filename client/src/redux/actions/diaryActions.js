import axios from '../../config/axiosConfig'
import { returnErrors } from './errorActions'
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
} from '../actionTypes'
import { tokenConfig } from './authenticationActions'
import { history } from '../../config/history'

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
            const errorMessage = err.response.data.data

            dispatch(
                returnErrors(err.response.status, err.response.status, errorMessage)
            )
            dispatch({
                type: TRANSLATE_FAIL,
                payload: err.response.data
            })
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
            const errorMessage = err.response.data.data

            dispatch(
                returnErrors(err.response.status, err.response.status, errorMessage)
            )
            dispatch({
                type: ADD_DIARY_POST_FAIL,
                payload: err.response.data
            })
            errorCallback(errorMessage)
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
            console.log(err)
            const errorMessage = err.response.data.data

            dispatch(
                returnErrors(err.response.status, err.response.status, errorMessage)
            )
            dispatch({
                type: GET_DIARY_POST_FAIL,
                payload: err.response.data
            })
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
            const errorMessage = err.response.data.data

            dispatch(
                returnErrors(err.response.status, err.response.status, errorMessage)
            )
            dispatch({
                type: UPDATE_DIARY_POST_FAIL,
                payload: err.response.data
            })
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
            const errorMessage = err.response.data.data

            dispatch(
                returnErrors(err.response.status, err.response.status, errorMessage)
            )
            dispatch({
                type: DELETE_DIARY_POST_FAIL,
                payload: err.response.data
            })
        })
}