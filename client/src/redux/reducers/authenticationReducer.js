import { LOGIN_USER, REGISTER_USER } from '../actionTypes'

const initialState = {
    
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
            }
        case REGISTER_USER:
            console.log(action.payload)
            return {
                ...state,
            }
        default:
            return state
    }
}