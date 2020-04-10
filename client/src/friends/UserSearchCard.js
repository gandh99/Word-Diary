import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AccountCircle from '../images/account_circle.png'
import { issueFriendRequestAction } from '../redux/actions/friendsActions'

export default function UserSearchCard(props) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const issueFriendRequest = (recipientData, done) => dispatch(issueFriendRequestAction(recipientData, done))

    const onAddFriend = (e, recipientUsername) => {
        e.preventDefault()
        issueFriendRequest({
            recipient: recipientUsername
        },
            () => { }
        )
    }

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent className={classes.cardContent}>
                <div className={classes.displayPictureArea}>
                    <img src={AccountCircle} className={classes.displayPicture} />
                </div>
                <div className={classes.userDataArea}>
                    <Typography className={classes.username} variant="h5" component="h2">
                        {props.user.username}
                    </Typography>
                    <Typography className={classes.description} variant="h6" component="h6">
                        {props.user.personalMessage}
                    </Typography>
                </div>
                <Button
                    onClick={(e) => { onAddFriend(e, props.user.username) }}
                    variant="contained"
                    disableElevation
                    className={classes.addButton}
                    color='secondary' >
                    Add
                </Button>
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
    description: {
        fontSize: 12,
        margin: '0 0',
        color: theme.palette.text.hint
    },
    addButton: {
        textTransform: 'none',
        verticalAlign: 'middle',
        height: '80%',
        marginLeft: 'auto'
    },
}))