import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Button from '@material-ui/core/Button'
import AccountCircle from '../images/account_circle.png'

export default function UserSearchCard(props) {
    const classes = useStyles()

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent className={classes.cardContent}>
                <img src={AccountCircle} className={classes.displayPicture} />
                <Typography className={classes.username} variant="h5" component="h2">
                    {props.username}
                </Typography>
                <Button variant="contained" disableElevation className={classes.addButton} color='secondary'>
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
    displayPicture: {
        width: '3rem'
    },
    username: {
        fontSize: 16,
        margin: '0 2rem'
    },
    addButton: {
        textTransform: 'none',
        verticalAlign: 'middle',
        height: '80%',
        marginLeft: 'auto'
    },
}))