import { LOGIN_USER } from '../actionTypes'

export const loginUserAction = userData => ({
    type: LOGIN_USER,
    payload: userData
})