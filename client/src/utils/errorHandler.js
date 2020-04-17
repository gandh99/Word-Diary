import { useDispatch } from 'react-redux'
import { returnErrors } from '../redux/actions/errorActions'

// For dispatching errors to the redux store
export function useErrorDispatch(dispatch, errorId, errorStatus, errorMessage, failureActionType, failurePayload) {
    dispatch(
        returnErrors(errorId, errorStatus, errorMessage)
    )
    dispatch({
        type: failureActionType,
        payload: failurePayload
    })    
}