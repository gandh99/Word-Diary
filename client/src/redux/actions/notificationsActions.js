import axios from '../../config/axiosConfig'
import {
    GET_NOTIFICATIONS_FOR_RECEIVED_FRIEND_REQUESTS_SUCCESS,
    GET_NOTIFICATIONS_FOR_RECEIVED_FRIEND_REQUESTS_FAIL,
    DELETE_NOTIFICATIONS_FOR_RECEIVED_FRIEND_REQUESTS_SUCCESS,
    DELETE_NOTIFICATIONS_FOR_RECEIVED_FRIEND_REQUESTS_FAIL,
    GET_NOTIFICATIONS_FOR_SHARED_DIARY_POSTS_FAIL,
    GET_NOTIFICATIONS_FOR_SHARED_DIARY_POSTS_SUCCESS,
    DELETE_NOTIFICATIONS_FOR_SHARED_DIARY_POSTS_SUCCESS,
    DELETE_NOTIFICATIONS_FOR_SHARED_DIARY_POSTS_FAIL
} from '../actionTypes'
import { tokenConfig } from './authenticationActions'
import { useErrorDispatch } from '../../utils/errorHandler'

export const getReceivedFriendRequestsNotificationsAction = () => (dispatch, getState) => {
    axios
        .get('/notifications/get-received-friend-requests-notifications', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_NOTIFICATIONS_FOR_RECEIVED_FRIEND_REQUESTS_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            useErrorDispatch(
                dispatch,
                err.response.status,
                err.response.status,
                err.response.data.data,
                GET_NOTIFICATIONS_FOR_RECEIVED_FRIEND_REQUESTS_FAIL,
                err.response.data
            )
        })
}

export const deleteReceivedFriendRequestsNotificationsAction = () => (dispatch, getState) => {
    axios
        .put('/notifications/delete-received-friend-requests-notifications', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_NOTIFICATIONS_FOR_RECEIVED_FRIEND_REQUESTS_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            useErrorDispatch(
                dispatch,
                err.response.status,
                err.response.status,
                err.response.data.data,
                DELETE_NOTIFICATIONS_FOR_RECEIVED_FRIEND_REQUESTS_FAIL,
                err.response.data
            )
        })
}

export const getSharedDiaryPostsNotificationsAction = () => (dispatch, getState) => {
    axios
        .get('/notifications/get-shared-diary-posts-notifications', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_NOTIFICATIONS_FOR_SHARED_DIARY_POSTS_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            useErrorDispatch(
                dispatch,
                err.response.status,
                err.response.status,
                err.response.data.data,
                GET_NOTIFICATIONS_FOR_SHARED_DIARY_POSTS_FAIL,
                err.response.data
            )
        })
}

export const deleteSharedDiaryPostsNotificationsAction = () => (dispatch, getState) => {
    axios
        .put('/notifications/delete-shared-diary-post-notifications', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_NOTIFICATIONS_FOR_SHARED_DIARY_POSTS_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            useErrorDispatch(
                dispatch,
                err.response.status,
                err.response.status,
                err.response.data.data,
                DELETE_NOTIFICATIONS_FOR_SHARED_DIARY_POSTS_FAIL,
                err.response.data
            )
        })
}