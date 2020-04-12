import axios from '../../config/axiosConfig'
import { returnErrors } from './errorActions'
import {
    USER_SEARCH_SUCCESS,
    USER_SEARCH_FAIL,
    ISSUE_FRIEND_REQUEST_SUCCESS,
    ISSUE_FRIEND_REQUEST_FAIL,
    RESPOND_TO_PENDING_FRIEND_REQUEST_SUCCESS,
    RESPOND_TO_PENDING_FRIEND_REQUEST_FAIL,
    GET_FRIEND_REQUESTS_ISSUED_TO_ME_SUCCESS,
    GET_FRIEND_REQUESTS_ISSUED_TO_ME_FAIL,
    GET_FRIENDS_SUCCESS,
    GET_FRIENDS_FAIL,
    UNFRIEND_SUCCESS,
    UNFRIEND_FAIL
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

export const getFriendRequestsIssuedToMeAction = () => (dispatch, state) => {
    axios
        .get('/friends/get-friend-requests-issued-to-me', tokenConfig(state))
        .then(res => {
            dispatch({
                type: GET_FRIEND_REQUESTS_ISSUED_TO_ME_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            const errorMessage = err.response.data.data

            dispatch(
                returnErrors(err.response.status, err.response.status, errorMessage)
            )
            dispatch({
                type: GET_FRIEND_REQUESTS_ISSUED_TO_ME_FAIL,
                payload: err.response.data
            })
        })
}

export const respondToPendingFriendRequestAction = (responseData, successCallback, errorCallback) => (dispatch, state) => {
    axios
        .put('/friends/respond-to-pending-friend-request', responseData, tokenConfig(state))
        .then(res => {
            dispatch({
                type: RESPOND_TO_PENDING_FRIEND_REQUEST_SUCCESS,
                payload: res.data.data
            })
            successCallback('Successfully responded to pending friend request.')
        })
        .catch(err => {
            const errorMessage = err.response.data.data

            dispatch(
                returnErrors(err.response.status, err.response.status, errorMessage)
            )
            dispatch({
                type: RESPOND_TO_PENDING_FRIEND_REQUEST_FAIL,
                payload: err.response.data
            })
            errorCallback(errorMessage)
        })
}

export const getFriendsAction = () => (dispatch, state) => {
    axios
        .get('/friends/get-friends', tokenConfig(state))
        .then(res => {
            dispatch({
                type: GET_FRIENDS_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            const errorMessage = err.response.data.data

            dispatch(
                returnErrors(err.response.status, err.response.status, errorMessage)
            )
            dispatch({
                type: GET_FRIENDS_FAIL,
                payload: err.response.data
            })
        })
}

export const unfriendAction = (targetData, successCallback) => (dispatch, state) => {
    axios
        .put('/friends/unfriend', targetData, tokenConfig(state))
        .then(res => {
            dispatch({
                type: UNFRIEND_SUCCESS,
                payload: res.data.data
            })
            successCallback()
        })
        .catch(err => {
            const errorMessage = err.response.data.data

            dispatch(
                returnErrors(err.response.status, err.response.status, errorMessage)
            )
            dispatch({
                type: UNFRIEND_FAIL,
                payload: err.response.data
            })
        })
}