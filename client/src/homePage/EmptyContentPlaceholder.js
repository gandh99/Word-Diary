import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { history } from '../history'
import { makeStyles } from '@material-ui/core/styles'
import Bear from '../images/bear.png'
import { Typography } from '@material-ui/core'
import { logoutUserAction } from '../redux/actions/authenticationActions'

export default function EmptyContentPlaceholder() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = useSelector(state => state.authentication.userData)

    const loginRedirect = () => {
        dispatch(logoutUserAction())
        history.push('/login')
    }

    const loginMessage =
        <>
            <span>Please </span>
            <span className={classes.loginText} onClick={loginRedirect}>login</span>
            <span> to view this content.</span>
        </>

    return (
        <div>
            <img src={Bear} style={bearStyle} alt={"Rawr! I'm a bear!"} />
            <Typography component="h5" className={classes.bearCaption}>
                {user ? 'Oops! Nothing to see here!' : loginMessage}
            </Typography>
        </div>
    )
}

const bearStyle = {
    width: '100px',
    marginTop: '150px'
}

const useStyles = makeStyles(theme => ({
    bearCaption: {
        color: theme.palette.text.tertiary,
        fontWeight: 'bold',
    },
    loginText: {
        cursor: 'pointer',
        textDecoration: 'underline',
        color: theme.palette.secondary.light
    }
}))