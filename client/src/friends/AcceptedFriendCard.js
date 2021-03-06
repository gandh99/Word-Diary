import React from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Card, CardContent, Typography, Button } from '@material-ui/core'
import AccountCircle from '../images/account_circle.png'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import { unfriendAction } from '../redux/actions/friendsActions'
import { showFriendsDiaryPostsModal } from '../redux/actions/modalDisplayActions'

export default function AcceptedFriendCard(props) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const unfriendUser = () => {
        dispatch(unfriendAction(
            props.friend,
            // successCallback
            () => {
                props.displaySnackbar('Unfriended user', 'success')
            }
        ))
    }

    return (
        <Grid item xs={12} sm={12} md={4} lg={4}>
            <Card className={classes.card} style={cardStyle}>
                <CardContent className={classes.cardContent}>
                    <div className={classes.displayPictureArea}>
                        <img src={AccountCircle} className={classes.displayPicture} alt='Account Icon' />
                    </div>
                    <div className={classes.userDataArea}>
                        <Typography className={classes.username} variant="h5" component="h2">
                            {props.friend.username}
                        </Typography>
                        <Typography className={classes.personalMessage} variant="h6" component="h6">
                            {props.friend.personalMessage}
                        </Typography>
                    </div>
                </CardContent>
                <div className={classes.footer}>
                    <Button
                        onClick={() => dispatch(showFriendsDiaryPostsModal(props.friend))}
                        startIcon={<MenuBookIcon className={classes.footerIcon} />}
                        className={classes.footerButton} >
                        Diary
                    </Button>
                    <Button
                        startIcon={<ChatBubbleOutlineIcon className={classes.footerIcon} />}
                        className={classes.footerButton} >
                        Message
                    </Button>
                    <Button
                        onClick={unfriendUser}
                        startIcon={<RemoveCircleOutlineIcon className={classes.footerIcon} />}
                        className={classes.footerButton} >
                        Unfriend
                    </Button>
                </div>
            </Card>
        </Grid>
    )
}

const cardStyle = {
    textAlign: 'start',
    position: 'relative'
}

const useStyles = makeStyles((theme) => ({
    card: {
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    displayPictureArea: {
        minWidth: '50px',
        maxWidth: '50px',
        marginRight: '15px'
    },
    displayPicture: {
        width: '100%',
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
    footer: {
        padding: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    footerButton: {
        textTransform: 'none',
        verticalAlign: 'middle',
        padding: '0.5rem 1.5rem',
        color: theme.palette.grey[600]
    },
    footerIcon: {
        fill: theme.palette.grey[600]
    }
}))