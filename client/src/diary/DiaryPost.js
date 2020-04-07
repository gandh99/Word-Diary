import React from 'react'
import { useDispatch } from 'react-redux'
import { Grid, Divider } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'
import ShareIcon from '@material-ui/icons/Share'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutlineOutlined'
import { updateDiaryPostAction } from '../redux/actions/diaryActions'

export default function DiaryPost(props) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const updateDiaryPost = (postData, done) => dispatch(updateDiaryPostAction(postData, done))
    let currentPost = { ...props.post }

    const toggleStarPost = (event, starred) => {
        currentPost.starred = starred
        submitUpdate()
    }

    const submitUpdate = (event) => {
        updateDiaryPost(currentPost, () => props.refresh())
    }

    return (
        <Grid item xs={12} sm={6}>
            <Card style={cardStyle}>
                <CardContent>
                    <div style={toolbarHeaderStyle}>
                        <ShareIcon
                            htmlColor={toolbarIconDefaultColor}
                            style={toolbarIconStyle}
                            className={classes.share} />
                        <DeleteOutlineIcon
                            htmlColor={toolbarIconDefaultColor}
                            style={toolbarIconStyle}
                            className={classes.delete} />
                    </div>
                    <div className={classes.phrase}>{props.post.phrase}</div>
                    <Divider />
                    <div className={classes.translatedPhrase}>{props.post.translatedPhrase}</div>
                    <div className={classes.note}>{props.post.note}</div>
                    <div style={toolbarFooterStyle}>
                        {
                            props.post.starred
                                ? <StarIcon
                                    onClick={(e) => toggleStarPost(e, false)}
                                    htmlColor={starIconFilledColor}
                                    style={toolbarIconStyle}
                                    className={classes.starUnfilled} />
                                : <StarBorderIcon
                                    onClick={(e) => toggleStarPost(e, true)}
                                    htmlColor={toolbarIconDefaultColor}
                                    style={toolbarIconStyle}
                                    className={classes.starUnfilled} />
                        }
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

const toolbarIconDefaultColor = '#888888'
const starIconFilledColor = '#ffb600'