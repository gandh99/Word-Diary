import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Button from '@material-ui/core/Button'

export default function UserSearchCard(props) {
    const classes = useStyles()

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <AccountCircleIcon color='primary' fontSize='large' />
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
    username: {
        fontSize: 18,
        display: 'inline',
        margin: '0 2rem'
    },
    addButton: {
        textTransform: 'none',
        float: 'right',
    },
}))