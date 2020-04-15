import { combineReducers } from 'redux'
import authenticationReducer from './authenticationReducer'
import errorReducer from './errorReducer'
import diaryReducer from './diaryReducer'
import friendsReducer from './friendsReducer'
import notificationsReducer from './notificationsReducer'
import modalDisplayReducer from './modalDisplayReducer'

export default combineReducers({
    authentication: authenticationReducer,
    error: errorReducer,
    diary: diaryReducer,
    friends: friendsReducer,
    notifications: notificationsReducer,
    modalDisplay: modalDisplayReducer
})