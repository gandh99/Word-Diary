import axios from '../../config/axiosConfig'
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
import { useErrorDispatch } from '../../utils/errorHandler'

export const userSearchAction = (searchString) => (dispatch, getState) => {
    axios
        .get(`/friends/user-search/${searchString}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_SEARCH_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            useErrorDispatch(
                dispatch,
                err.response.status,
                err.response.status,
                err.response.data.data,
                USER_SEARCH_FAIL,
                err.response.data
            )
        })
}

export const issueFriendRequestAction = (recipientData, successCallback, errorCallback) => (dispatch, state) => {
    axios
        .post('/friends/issue-friend-request', recipientData, tokenConfig(state))
        .then(res => {
            dispatch({
                type: ISSUE_FRIEND_REQUEST_SUCCESS,
                payload: recipientData
            })
            successCallback('Friend request sent.')
        })
        .catch(err => {
            useErrorDispatch(
                dispatch,
                err.response.status,
                err.response.status,
                err.response.data.data,
                ISSUE_FRIEND_REQUEST_FAIL,
                err.response.data
            )

            errorCallback(err.response.data.data)
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
            useErrorDispatch(
                dispatch,
                err.response.status,
                err.response.status,
                err.response.data.data,
                GET_FRIEND_REQUESTS_ISSUED_TO_ME_FAIL,
                err.response.data
            )
        })
}

export const respondToPendingFriendRequestAction = (friendData, successCallback, errorCallback) => (dispatch, state) => {
    axios
        .put('/friends/respond-to-pending-friend-request', friendData, tokenConfig(state))
        .then(res => {
            dispatch({
                type: RESPOND_TO_PENDING_FRIEND_REQUEST_SUCCESS,
                payload: res.data.data
            })
            successCallback('Successfully responded to pending friend request.')
        })
        .catch(err => {
            useErrorDispatch(
                dispatch,
                err.response.status,
                err.response.status,
                err.response.data.data,
                RESPOND_TO_PENDING_FRIEND_REQUEST_FAIL,
                err.response.data
            )
            errorCallback(err.response.data.data)
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
            useErrorDispatch(
                dispatch,
                err.response.status,
                err.response.status,
                err.response.data.data,
                GET_FRIENDS_FAIL,
                err.response.data
            )
        })
}

export const unfriendAction = (friendData, successCallback) => (dispatch, state) => {
    axios
        .put('/friends/unfriend', friendData, tokenConfig(state))
        .then(res => {
            dispatch({
                type: UNFRIEND_SUCCESS,
                payload: res.data.data
            })
            successCallback()
        })
        .catch(err => {
            useErrorDispatch(
                dispatch,
                err.response.status,
                err.response.status,
                err.response.data.data,
                UNFRIEND_FAIL,
                err.response.data
            )
        })
}