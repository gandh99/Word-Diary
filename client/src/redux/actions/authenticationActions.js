import { LOGIN_USER, REGISTER_USER } from '../actionTypes'
import axios from 'axios'

export const loginUserAction = (userData, successCallback, errorCallback) => dispatch => {
    axios.post('/authentication/login', userData)
        .then(res => {
            const { success } = res.data

            // Return callback
            if (success) {
                successCallback('Login successful.')
            } else {
                const errorMessage = res.data.data
                errorCallback(errorMessage)
            }

            dispatch({
                type: LOGIN_USER,
                payload: res.data
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
                type: REGISTER_USER,
                payload: res.data
            })
        })
}