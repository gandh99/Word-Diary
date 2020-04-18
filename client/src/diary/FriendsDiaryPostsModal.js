import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fade, makeStyles } from '@material-ui/core/styles'
import { Modal, Button } from 'react-bootstrap'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { getFriendsPostsAction } from '../redux/actions/diaryActions'
import FriendsDiaryPost from './FriendsDiaryPost'

export default function FriendsDiaryPostsModal(props) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const friend = useSelector(state => state.modalDisplay.friend)
    const friendsPosts = useSelector(state => state.diary.friendsPosts)

    useEffect(() => {
        dispatch(getFriendsPostsAction({ friendId: friend._id }))
    }, [friend])

    const onHide = () => {
        props.onHide()
    }

    return (
        <Modal
            {...props}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='modal' >
            <Modal.Header>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search for a friend…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
            </Modal.Header>
            <div className={classes.userResultsArea}>
                <Modal.Body className={classes.modalBody}>
                    {
                        friendsPosts.map(post =>
                            <FriendsDiaryPost
                                post={post}
                            />
                        )
                    }
                </Modal.Body>
            </div>
            <Modal.Footer>
                <Button type='submit' className={classes.button}>
                    Done
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade('#bbb', 0.15),
        '&:hover': {
            backgroundColor: fade('#ccc', 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    modalBody: {
        height: '20rem'
    },
    userResultsArea: {
        maxHeight: '100%',
        overflow: 'auto'
    },
    button: {
        backgroundColor: theme.palette.primary.main
    }
}))