import axios from '../../config/axiosConfig'
import { returnErrors } from './errorActions'
import {
    USER_SEARCH_SUCCESS,
    USER_SEARCH_FAIL,
    ISSUE_FRIEND_REQUEST_SUCCESS,
    ISSUE_FRIEND_REQUEST_FAIL,
    GET_PENDING_FRIEND_REQUESTS_SUCCESS,
    GET_PENDING_FRIEND_REQUESTS_FAIL
} from '../actionTypes'
import { tokenConfig } from './authenticationActions'

export const userSearchAction = (searchString, done) => (dispatch, getState) => {
    axios
        .get(`/friends/user-search/${searchString}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_SEARCH_SUCCESS,
                payload: res.data.data
            })
            done(res.data.data)
        })
        .catch(err => {
            const errorMessage = err.response.data.data

            dispatch(
                returnErrors(err.response.status, err.response.status, errorMessage)
            )
            dispatch({
                type: USER_SEARCH_FAIL,
                payload: err.response.data
            })
        })
}

export const issueFriendRequestAction = (recipientData, successCallback, errorCallback) => (dispatch, state) => {
    axios
        .post('/friends/issue-friend-request', recipientData, tokenConfig(state))
        .then(res => {
            dispatch({
                type: ISSUE_FRIEND_REQUEST_SUCCESS,
                payload: recipientData.recipient
            })
            successCallback(res.data.data)
        })
        .catch(err => {
            const errorMessage = err.response.data.data

            dispatch(
                returnErrors(err.response.status, err.response.status, errorMessage)
            )
            dispatch({
                type: ISSUE_FRIEND_REQUEST_FAIL,
                payload: err.response.data
            })

            errorCallback(errorMessage)
        })
}

export const getPendingFriendRequestsAction = () => (dispatch, state) => {
    axios
        .get('/friends/get-pending-requests', tokenConfig(state))
        .then(res => {
            dispatch({
                type: GET_PENDING_FRIEND_REQUESTS_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            const errorMessage = err.response.data.data

            dispatch(
                returnErrors(err.response.status, err.response.status, errorMessage)
            )
            dispatch({
                type: GET_PENDING_FRIEND_REQUESTS_FAIL,
                payload: err.response.data
            })
        })
}