import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fade, makeStyles } from '@material-ui/core/styles'
import { Modal, Button, Form } from 'react-bootstrap'
import GTranslateIcon from '@material-ui/icons/GTranslate'
import { Tooltip } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'

export default function AddFriendModal(props) {
    const classes = useStyles()
    const dispatch = useDispatch()
    // const [phrase, setPhrase] = useState('')
    // const [translatedPhrase, setTranslatedPhrase] = useState('')
    // const [note, setNote] = useState('')
    // const translatePhrase = (phrase, callback) => dispatch(translateAction(phrase, callback))
    // const addDiaryPost = (postData, successCallback, errorCallback) => dispatch(addDiaryPostAction(postData, successCallback, errorCallback))

    const onSubmit = (event) => {
        event.preventDefault()

        // Validate input
        if (!inputIsValid()) {
            return
        }

        // Add the diary entry
        // addDiaryPost(
        //     {
        //         phrase,
        //         translatedPhrase,
        //         note
        //     },
        //     // successCallback
        //     (message) => {
        //         props.refresh()
        //         props.showSnackbar(message, 'success')
        //     },
        //     // errorCallback
        //     (message) => {
        //         props.showSnackbar(message, 'error')
        //     }
        // )
        onHide()
    }

    const onHide = () => {
        props.onHide()
        // setTranslatedPhrase('')
    }

    const inputIsValid = () => {
        // return (phrase.length > 0 && translatedPhrase.length > 0 && note.length > 0)
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
            <Form onSubmit={onSubmit}>
                <Modal.Body className={classes.modalBody}>

                </Modal.Body>
            </Form>
            <Modal.Footer className='modal-footer'>
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
    button: {
        backgroundColor: theme.palette.primary.main
    }
}))