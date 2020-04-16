import React from 'react'
import { useDispatch } from 'react-redux'
import { Grid, Divider } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos'
import AccountCircleIcon from '../images/account_circle.png'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutlineOutlined'
import { Tooltip } from '@material-ui/core'
import { updateDiaryPostAction, deleteDiaryPostAction, respondToDiaryPostSharedWithMeAction } from '../redux/actions/diaryActions'
import { showShareDiaryPostModal } from '../redux/actions/modalDisplayActions'

export default function SharedDiaryPost(props) {
    const classes = useStyles()
    const dispatch = useDispatch()
    let creator = props.sharedPost.creator
    let sharedPost = props.sharedPost.post

    const toggleStarPost = (event, starred) => {
        sharedPost.starred = starred
        submitUpdate()
    }

    const deletePost = () => {

    }

    const submitUpdate = (event) => {
    }

    return (
        <Grid item xs={12} sm={6}>
            <Card style={cardStyle}>
                <CardContent>
                    <div className={classes.toolbarHeader}>
                        <Tooltip title='Add post to my diary'>
                            <AddToPhotosIcon
                                onClick={() => dispatch(respondToDiaryPostSharedWithMeAction({
                                    sharedPost: props.sharedPost
                                }))}
                                htmlColor={toolbarIconDefaultColor}
                                className={classes.share + ' ' + classes.toolbarIcon} />
                        </Tooltip>
                        <Tooltip title='Delete post'>
                            <DeleteOutlineIcon
                                onClick={() => deletePost()}
                                htmlColor={toolbarIconDefaultColor}
                                className={classes.delete + ' ' + classes.toolbarIcon} />
                        </Tooltip>
                    </div>
                    <div className={classes.phrase}>{sharedPost.phrase}</div>
                    <Divider />
                    <div className={classes.translatedPhrase}>{sharedPost.translatedPhrase}</div>
                    <div className={classes.note}>{sharedPost.note}</div>
                </CardContent>
                <CardContent>
                    <Tooltip title={'Shared by ' + creator.username}>
                        <div className={classes.toolbarFooter}>
                            <img className={classes.accountIcon} src={AccountCircleIcon} />
                            <span className={classes.creatorUsername}>{creator.username}</span>
                        </div>
                    </Tooltip>
                </CardContent>
            </Card>
        </Grid>
    )
}

const cardStyle = {
    textAlign: 'start',
    position: 'relative'
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
    toolbarHeader: {
        position: 'absolute',
        top: '10px',
        right: '10px',
    },
    toolbarIcon: {
        margin: '0 0.3rem',
        cursor: 'pointer'
    },
    toolbarFooter: {
        position: 'absolute',
        bottom: '10px',
        right: '20px',
        cursor: 'pointer'
    },
    accountIcon: {
        width: '2rem',
        marginRight: '0.5rem'
    },
    creatorUsername: {
        color: toolbarIconDefaultColor
    }
}))