import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_USER } from '../actionTypes'
import axios from 'axios'

export const loginUserAction = (userData, successCallback, errorCallback) => dispatch => {
    axios.post('/authentication/login', userData)
        .then(res => {
            successCallback('Login successful.')
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            const errorMessage = err.response.data.data
            errorCallback(errorMessage)
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data
            })
        })
}

export const registerUserAction = (userData, successCallback, errorCallback) => dispatch => {
    axios.post('/authentication/register', userData)
        .then(res => {
            const { success } = res.data

            // Return callback
            if (success) {
                successCallback('Registration successful.')
            } else {
                const errorMessage = res.data.data
                errorCallback(errorMessage)
            }

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        })
}