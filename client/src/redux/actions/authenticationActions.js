import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT_SUCCESS } from '../actionTypes'
import axios from '../../config/axiosConfig'
import { history } from '../../config/history'
import { useErrorDispatch } from '../../utils/errorHandler'

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
            errorCallback(err.response.data.data)
            useErrorDispatch(
                dispatch,
                err.response.status,
                err.response.status,
                err.response.data.data,
                LOGIN_FAIL,
                err.response.data
            )
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
            errorCallback(err.response.data.data)
            useErrorDispatch(
                dispatch,
                err.response.status,
                err.response.status,
                err.response.data.data,
                REGISTER_FAIL,
                err.response.data
            )
        })
}

export const logoutUserAction = () => dispatch => {
    dispatch({
        type: LOGOUT_SUCCESS
    })
    history.push('/login')
}

export const tokenConfig = (getState) => {
    // Get access token from the state in authenticationReducer
    const accessToken = getState().authentication.accessToken
    
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    // Add the access token to the header
    if (accessToken) {
        config.headers['authorization'] = accessToken
    }
    
    return config
}