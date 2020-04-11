import React from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Card, CardContent, Tooltip, Divider, Typography, Button } from '@material-ui/core'
import AccountCircle from '../images/account_circle.png'

export default function PendingFriendCard(props) {
    const classes = useStyles()
    const dispatch = useDispatch()

    return (
        <Grid item xs={12} sm={12} md={4} lg={4}>
            <Card className={classes.card} style={cardStyle}>
                <CardContent className={classes.cardContent}>
                    <div className={classes.displayPictureArea}>
                        <img src={AccountCircle} className={classes.displayPicture} />
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
                <CardContent className={classes.toolbar}>
                    <Button className={classes.button} variant="contained" color="secondary">Accept</Button>
                    <Button className={classes.button} color="secondary">Reject</Button>
                </CardContent>
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
    toolbar: {
        margin: 0,
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    button: {
        textTransform: 'none',
        verticalAlign: 'middle',
        height: '80%',
        margin: '0 1.5rem'
    },
}))