import React from 'react'
import { Grid, Divider } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'
import ShareIcon from '@material-ui/icons/Share'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutlineOutlined'

export default function DiaryPost(props) {
    const classes = useStyles()

    return (
        <Grid item xs={12} sm={6}>
            <Card style={cardStyle}>
                <CardContent>
                    <div style={toolbarHeaderStyle}>
                        <ShareIcon htmlColor={toolbarIconDefaultColor} style={toolbarIconStyle} className={classes.share} />
                        <DeleteOutlineIcon htmlColor={toolbarIconDefaultColor} style={toolbarIconStyle} className={classes.delete} />
                    </div>
                    <div className={classes.phrase}>{props.post.phrase}</div>
                    <Divider />
                    <div className={classes.translatedPhrase}>{props.post.translatedPhrase}</div>
                    <div className={classes.note}>{props.post.note}</div>
                    <div style={toolbarFooterStyle}>
                        <StarBorderIcon htmlColor={toolbarIconDefaultColor} style={toolbarIconStyle} className={classes.starUnfilled} />
                    </div>
                </CardContent>
            </Card>
        </Grid>

    )
}

const cardStyle = {
    textAlign: 'start',
    position: 'relative'
}

const toolbarHeaderStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
}

const toolbarFooterStyle = {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
}

const toolbarIconStyle = {
    margin: '0 0.3rem',
    cursor: 'pointer'
}

const toolbarIconDefaultColor = '#888888'

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
    starUnfilled: {
    },
    share: {
    },
    delete: {
    }
}))