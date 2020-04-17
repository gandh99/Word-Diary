import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AccountCircle from '../images/account_circle.png'
import CheckIcon from '@material-ui/icons/Check'
import { issueFriendRequestAction, respondToPendingFriendRequestAction } from '../redux/actions/friendsActions'
import { shareDiaryPostAction } from '../redux/actions/diaryActions'

export default function UserSearchCard(props) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [buttonStatus, setButtonStatus] = useState(props.user.status)
    const issueFriendRequest = (recipientData, successCallback, errorCallback) => dispatch(issueFriendRequestAction(recipientData, successCallback, errorCallback))

    // This is used when a user wants to share a diary post with a friend
    // TODO: This variable might be redundant...
    const postToShare = useSelector(state => state.modalDisplay.postToShare)

    // Buttons
    const disabledButton =
        <Button className={classes.button} variant="outlined" disabled>
            {buttonStatus}
        </Button>
    const addButton =
        <Button
            onClick={(e) => { onIssueFriendRequest(e) }}
            variant="contained"
            disableElevation
            className={classes.button}
            color='secondary' >
            {buttonStatus}
        </Button>
    const acceptButton =
        <Button
            onClick={(e) => {
                onAcceptFriendRequest(e)
            }}
            variant="contained"
            disableElevation
            className={classes.button + ' ' + classes.acceptButton} >
            {buttonStatus}
        </Button>
    const friendsButton =
        <Button
            className={classes.button + ' ' + classes.friendsButton}
            startIcon={<CheckIcon />}
            variant='outlined' >
            {buttonStatus}
        </Button>
    const shareButton =
        <Button
            onClick={(e) => { onSharePost(e) }}
            variant="contained"
            disableElevation
            className={classes.button}
            color='secondary' >
            {buttonStatus}
        </Button>

    const onIssueFriendRequest = (e) => {
        e.preventDefault()
        issueFriendRequest(
            props.user,
            // successCallback
            (message) => {
                props.showSnackbar(message, 'success')
                setButtonStatus('Pending')
            },
            // errorCallback
            (message) => {
                props.showSnackbar(message, 'fail')
            }
        )
    }

    const onAcceptFriendRequest = (e) => {
        e.preventDefault()
        dispatch(respondToPendingFriendRequestAction(
            {
                ...props.user,
                isAccepted: true
            },
            // successCallback
            (message) => {
                props.showSnackbar(message, 'success')
                setButtonStatus('Accepted')
            },
            // errorCallback
            (message) => {
                props.showSnackbar(message, 'fail')
            }
        ))
    }

    const onSharePost = (e) => {
        e.preventDefault()
        dispatch(shareDiaryPostAction({
            post: postToShare._id, 
            recipient: props.user._id
        }))
        setButtonStatus('Shared')
    }

    const generateButton = () => {
        switch (buttonStatus) {
            case 'Share':
                return shareButton
            case 'Shared':
            case 'Pending':
            case 'Accepted':
                return disabledButton
            case 'Friends':
                return friendsButton
            case 'Accept':
                return acceptButton
            case 'Add':
            default:
                return addButton
        }
    }

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent className={classes.cardContent}>
                <div className={classes.displayPictureArea}>
                    <img src={AccountCircle} className={classes.displayPicture} alt='Account Icon' />
                </div>
                <div className={classes.userDataArea}>
                    <Typography className={classes.username} variant="h5" component="h2">
                        {props.user.username}
                    </Typography>
                    <Typography className={classes.personalMessage} variant="h6" component="h6">
                        {props.user.personalMessage}
                    </Typography>
                </div>
                {generateButton()}
            </CardContent>
        </Card>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 275,
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    displayPictureArea: {
        minWidth: '50px',
        maxWidth: '50px',
    },
    displayPicture: {
        width: '100%',
    },
    userDataArea: {
        marginLeft: '1rem',
        marginRight: '1rem',
    },
    username: {
        fontSize: 16,
        margin: '0.2rem 0'
    },
    personalMessage: {
        fontSize: 12,
        margin: '0 0',
        color: theme.palette.text.hint
    },
    button: {
        textTransform: 'none',
        verticalAlign: 'middle',
        height: '80%',
        marginLeft: 'auto'
    },
    acceptButton: {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.success.dark
        }
    },
    friendsButton: {
        borderColor: theme.palette.success.main,
        color: theme.palette.success.main,
        '&:hover': {
            backgroundColor: 'transparent',
            cursor: 'default'
        }
    }
}))