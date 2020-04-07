import React from 'react'
import { Grid } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

export default function DiaryPost(props) {
    return (
        <Grid item xs={12} sm={6}>
            <Card style={cardStyle}>
                <CardContent>
                    <div>{props.post.phrase}</div>
                    <div>{props.post.translatedPhrase}</div>
                    <div>{props.post.note}</div>
                </CardContent>
            </Card>
        </Grid>

    )
}

const cardStyle = {
    textAlign: 'start',
}