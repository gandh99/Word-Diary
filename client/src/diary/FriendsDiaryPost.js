import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

export default function FriendsDiaryPost(props) {
    const classes = useStyles()

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent className={classes.cardContent}>
                <div className={classes.postArea}>
                    <Typography className={classes.phrase} variant="h5" component="h2">
                        {props.post.phrase}
                    </Typography>
                    <Typography className={classes.translatedPhrase} variant="h5" component="h2">
                        {props.post.translatedPhrase}
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
    postArea: {
        marginLeft: '1rem',
        marginRight: '1rem',
    },
    phrase: {
        fontSize: 16,
        margin: '0.2rem 0'
    },
    translatedPhrase: {
        fontSize: 12,
        margin: '0 0',
        color: theme.palette.text.hint
    },
}))