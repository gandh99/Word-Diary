import axios from 'axios'
import { returnErrors } from './errorActions'
import { TRANSLATE_SUCCESS, TRANSLATE_FAIL } from '../actionTypes'
import { tokenConfig } from './authenticationActions'

export const translateAction = (textData, callback) => (dispatch, getState) => {
    axios
        .post('/translate', textData, tokenConfig(getState))
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