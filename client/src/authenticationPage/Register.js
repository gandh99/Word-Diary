import React, { useState } from 'react'
import './login.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { useDispatch } from 'react-redux'
import { registerUserAction } from '../redux/actions/authenticationActions'

export default function Register() {
    const classes = useStyles()

    // Variables to handle Snackbar
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')

    // Variables to handle input
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const dispatch = useDispatch()
    const registerUser = (userData, successCallback, errorCallback) => dispatch(registerUserAction(userData, successCallback, errorCallback))

    const onSubmit = event => {
        event.preventDefault()

        if (hasErrors()) {
            return
        }
        registerUser({ username, password },
            // successCallback
            message => {
                console.log(message)
            },
            // errorCallback
            message => {
                console.log(message)
                setSnackbarMessage(message)
                setShowSnackbar(true)
            }
        )
        clearFormData()
    }

    const hasErrors = () => {
        let hasErrors = false

        if (username === '') {
            setUsernameError(true)
            hasErrors = true
        }
        if (password === '') {
            setPasswordError(true)
            hasErrors = true
        }

        return hasErrors
    }

    const clearFormData = () => {
        setUsername('')
        setPassword('')
    }

    return (
        <div className='login-container'>
            <Snackbar open={showSnackbar} autoHideDuration={6000}>
                <Alert severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <form onSubmit={onSubmit}>
                <div className='input-container'>
                    <TextField
                        onChange={(e) => setUsername(e.target.value)}
                        className={classes.textField}
                        required
                        error={usernameError}
                        id="standard-basic"
                        label="Username" />
                    <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        className={classes.textField}
                        required
                        error={passwordError}
                        id="standard-basic"
                        label="Password"
                        type='password' />
                    <Button
                        type='submit'
                        style={{ marginTop: '2rem' }}
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        disableElevation >
                        Register
                    </Button>
                </div>
            </form>
        </div>
    )
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
    textField: {
        marginTop: '1rem'
    },
    button: {
        maginTop: '2rem'
    }
}));   