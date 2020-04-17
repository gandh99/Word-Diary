import { useDispatch } from 'react-redux'
import { returnErrors } from '../redux/actions/errorActions'

// For dispatching errors to the redux store
export function useErrorDispatch(errorId, errorStatus, errorMessage, failureActionType, failurePayload) {
    const dispatch = useDispatch()
    console.log('hi?')
    dispatch(
        returnErrors(errorId, errorStatus, errorMessage)
    )
    dispatch({
        type: failureActionType,
        payload: failurePayload
    })    
}