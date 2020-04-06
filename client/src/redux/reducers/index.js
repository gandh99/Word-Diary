import { combineReducers } from 'redux'
import authenticationReducer from './authenticationReducer'
import errorReducer from './errorReducer'
import diaryReducer from './diaryReducer'

export default combineReducers({
    authentication: authenticationReducer,
    error: errorReducer,
    diary: diaryReducer
})