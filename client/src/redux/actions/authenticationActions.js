import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADING, USER_LOADED, AUTH_ERROR } from '../actionTypes'
import axios from 'axios'
import { returnErrors } from './errorActions'
import { history } from '../../history'

export const loginUserAction = (userData, successCallback, errorCallback) => dispatch => {
    axios
        .post('/authentication/login', userData)
        .then(res => {
            successCallback('Login successful.')
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            history.push('/')
        })
        .catch(err => {
            const errorMessage = err.response.data.data

            errorCallback(errorMessage)
            dispatch(
                returnErrors(err.response.status, err.response.status, errorMessage)
            )
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data
            })
        })
}

export const registerUserAction = (userData, successCallback, errorCallback) => dispatch => {
    axios
        .post('/authentication/register', userData)
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
            dispatch(
                returnErrors(err.response.status, err.response.status, errorMessage)
            )
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data
            })
        })
}

//TODO
export const loadUserAction = () => (dispatch, getState) => {
    dispatch({
        type: USER_LOADING
    })

    axios
        .get('/authentication/user', tokenConfig(getState))
        .then(res => {
            console.log('success')
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        })
        .catch(err => {
            const errorMessage = err.response.data.data
            dispatch(returnErrors(err.response.status, err.response.status, errorMessage))
            dispatch({
                type: AUTH_ERROR
            })
        })
}

export const tokenConfig = (getState) => {
    // Get access token from the state in authenticationReducer
    const accessToken = getState().authentication.accessToken

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    if (accessToken) {
        config.headers['authorization'] = accessToken
    }

    return config
}