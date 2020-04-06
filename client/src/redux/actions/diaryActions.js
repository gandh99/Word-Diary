import axios from 'axios'
import { returnErrors } from './errorActions'
import { TRANSLATE_SUCCESS, TRANSLATE_FAIL, ADD_DIARY_POST_SUCCESS, ADD_DIARY_POST_FAIL } from '../actionTypes'
import { tokenConfig } from './authenticationActions'

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
        })
}

export const getDiaryPostAction = () => (dispatch, getState) => {
    axios
        .get('/diary/get-post', tokenConfig(getState))
        .then(res => {
            console.log(res.data.data)
            dispatch({
                type: GET_DIARY_POST_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
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