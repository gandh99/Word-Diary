import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL } from '../actionTypes'
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
            successCallback('Registration successful.')
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            const errorMessage = err.response.data.data
            errorCallback(errorMessage)
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data
            })
        })
}