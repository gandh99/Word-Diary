import {
    USER_LOADING,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_ERROR,
    LOGOUT,
    REGISTER_USER
} from '../actionTypes'

const initialState = {
    accessToken: localStorage.getItem('accessToken'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            const { accessToken, refreshToken, tokenData } = action.payload.data
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
            
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            }
        case REGISTER_USER:
            return {
                ...state,
            }
        default:
            return state
    }
}