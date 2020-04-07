import React from 'react'
import { Grid, Divider } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'

export default function DiaryPost(props) {
    const classes = useStyles()

    return (
        <Grid item xs={12} sm={6}>
            <Card style={cardStyle}>
                <CardContent>
                    <div className={classes.phrase}>{props.post.phrase}</div>
                    <Divider />
                    <div className={classes.translatedPhrase}>{props.post.translatedPhrase}</div>
                    <div className={classes.note}>{props.post.note}</div>
                </CardContent>
            </Card>
        </Grid>

    )
}

const cardStyle = {
    textAlign: 'start',
}

const useStyles = makeStyles((theme) => ({
    phrase: {
        marginBottom: '0.5rem',
        fontWeight: 'bold'
    },
    translatedPhrase: {
        color: theme.palette.primary.dark,
        fontWeight: 'bold'
    },
    note: {
        color: theme.palette.text.secondary
    },
}))