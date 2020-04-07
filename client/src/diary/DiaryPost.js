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
import { Tooltip } from '@material-ui/core'
import { updateDiaryPostAction, deleteDiaryPostAction } from '../redux/actions/diaryActions'

export default function DiaryPost(props) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const updateDiaryPost = (postData, done) => dispatch(updateDiaryPostAction(postData, done))
    const deleteDiaryPost = (postData, done) => dispatch(deleteDiaryPostAction(postData, done))
    let currentPost = { ...props.post }

    const toggleStarPost = (event, starred) => {
        currentPost.starred = starred
        submitUpdate()
    }

    const deletePost = () => {
        deleteDiaryPost(currentPost, () => props.refresh())
    }

    const submitUpdate = (event) => {
        updateDiaryPost(currentPost, () => props.refresh())
    }

    return (
        <Grid item xs={12} sm={6}>
            <Card style={cardStyle}>
                <CardContent>
                    <div style={toolbarHeaderStyle}>
                        <Tooltip title='Share post'>
                            <ShareIcon
                                htmlColor={toolbarIconDefaultColor}
                                style={toolbarIconStyle}
                                className={classes.share} />
                        </Tooltip>
                        <Tooltip title='Delete post'>
                            <DeleteOutlineIcon
                                onClick={() => deletePost()}
                                htmlColor={toolbarIconDefaultColor}
                                style={toolbarIconStyle}
                                className={classes.delete} />
                        </Tooltip>
                    </div>
                    <div className={classes.phrase}>{props.post.phrase}</div>
                    <Divider />
                    <div className={classes.translatedPhrase}>{props.post.translatedPhrase}</div>
                    <div className={classes.note}>{props.post.note}</div>
                    <div style={toolbarFooterStyle}>
                        {
                            props.post.starred
                                ?
                                <Tooltip title='Unstar post'>
                                    <StarIcon
                                        onClick={(e) => toggleStarPost(e, false)}
                                        htmlColor={starIconFilledColor}
                                        style={toolbarIconStyle}
                                        className={classes.starUnfilled} />
                                </Tooltip>
                                :
                                <Tooltip title='Star post'>
                                    <StarBorderIcon
                                        onClick={(e) => toggleStarPost(e, true)}
                                        htmlColor={toolbarIconDefaultColor}
                                        style={toolbarIconStyle}
                                        className={classes.starUnfilled} />
                                </Tooltip>
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