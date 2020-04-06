import {
    USER_LOADING,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_ERROR,
    LOGOUT_SUCCESS,
} from '../actionTypes'

const initialState = {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    isAuthenticated: false,
    isLoading: false,
    userData: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                userData: action.payload
            };
        case LOGIN_SUCCESS:
            const { accessToken, refreshToken, userData } = action.payload.data
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
            
            return {
                ...state,
                userData: userData,
                isAuthenticated: true,
                isLoading: false
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')

            return {
                ...state,
                accessToken: null,
                refreshToken: null,
                userData: null,
                isAuthenticated: false,
                isLoading: false
            }
        default:
            return state
    }
}