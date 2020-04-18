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

export default function FriendsDiaryPost(props) {
    const classes = useStyles()
    const dispatch = useDispatch()

    // Buttons
    const disabledButton =
        <Button className={classes.button} variant="outlined" disabled>
        </Button>

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent className={classes.cardContent}>
                <div className={classes.displayPictureArea}>
                    <img src={AccountCircle} className={classes.displayPicture} alt='Account Icon' />
                </div>
                <div className={classes.userDataArea}>
                    <Typography className={classes.username} variant="h5" component="h2">
                        {props.post.phrase}
                    </Typography>
                </div>
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