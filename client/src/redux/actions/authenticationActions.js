import { LOGIN_USER, REGISTER_USER } from '../actionTypes'

export const loginUserAction = userData => ({
    type: LOGIN_USER,
    payload: userData
})

export const registerUserAction = userData => ({
    type: REGISTER_USER,
    payload: userData
})