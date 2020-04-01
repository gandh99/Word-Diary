import { LOGIN_USER, REGISTER_USER } from '../actionTypes'
import axios from 'axios'

export const loginUserAction = userData => ({
    type: LOGIN_USER,
    payload: userData
})

export const registerUserAction = userData => dispatch => {
    axios.post('/authentication/register', userData)
        .then(res => dispatch({
            type: REGISTER_USER,
            payload: res.data
        }))
}