import axios from '../../config/axiosConfig'
import { returnErrors } from './errorActions'
import {
    USER_SEARCH_SUCCESS,
    USER_SEARCH_FAIL
} from '../actionTypes'
import { tokenConfig } from './authenticationActions'

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