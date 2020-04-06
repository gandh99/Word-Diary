import axios from 'axios'
import { returnErrors } from './errorActions'
import { TRANSLATE_SUCCESS, TRANSLATE_FAIL } from '../actionTypes'

export const translateAction = (textData) => dispatch => {
    axios
        .post('/translate', textData)
        .then(res => {
            dispatch({
                type: TRANSLATE_SUCCESS,
                payload: res.data
            })
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