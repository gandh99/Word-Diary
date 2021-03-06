import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, Button, Form } from 'react-bootstrap'
import GTranslateIcon from '@material-ui/icons/GTranslate'
import { Tooltip } from '@material-ui/core'
import { translateAction, addDiaryPostAction } from '../redux/actions/diaryActions'

export default function AddDiaryPostModal(props) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [phrase, setPhrase] = useState('')
    const [translatedPhrase, setTranslatedPhrase] = useState('')
    const [note, setNote] = useState('')
    const translatePhrase = (phrase, callback) => dispatch(translateAction(phrase, callback))
    const addDiaryPost = (postData, successCallback, errorCallback) => dispatch(addDiaryPostAction(postData, successCallback, errorCallback))

    const fetchTranslation = (event) => {
        translatePhrase({ phrase },
            // Callback
            (translatedText) => {
                setTranslatedPhrase(translatedText)
            })
    }

    const onSubmit = (event) => {
        event.preventDefault()

        // Validate input
        if (!inputIsValid()) {
            return
        }

        // Add the diary entry
        addDiaryPost(
            {
                phrase,
                translatedPhrase,
                note
            },
            // successCallback
            (message) => {
                props.displaySnackbar(message, 'success')
            },
            // errorCallback
            (message) => {
                props.displaySnackbar(message, 'error')
            }
        )
        onHide()
    }

    const onHide = () => {
        props.onHide()
        setTranslatedPhrase('')
    }

    const inputIsValid = () => {
        return (phrase.length > 0 && translatedPhrase.length > 0 && note.length > 0)
    }

    return (
        <Modal
            {...props}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered >
            <Modal.Header className='modal-header'>
                <Modal.Title id="contained-modal-title-vcenter" className='modal-title'>
                    {'Add a new word'}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body className='modal-body'>
                    <Form.Group controlId={'word'}>
                        <Form.Control
                            className='form-text-input'
                            type="text"
                            placeholder='Enter a word or phrase'
                            onChange={(e) => { setPhrase(e.target.value) }}
                        />
                    </Form.Group>
                    <Form.Group controlId={'translation'}>
                        <Form.Control
                            style={translatedMeaningStyle}
                            className='form-text-input'
                            type="text"
                            placeholder='Enter translated meaning'
                            value={translatedPhrase}
                            onChange={(e) => { setTranslatedPhrase(e.target.value) }}
                        />
                        <Tooltip title='Fetch translation'>
                            <GTranslateIcon
                                color='primary'
                                style={translateButtonStyle}
                                onClick={() => { fetchTranslation() }}
                            />
                        </Tooltip>
                    </Form.Group>
                    <Form.Group controlId={'note'}>
                        <Form.Control
                            className='form-text-input'
                            type="text"
                            placeholder='Enter a note or example usage'
                            onChange={(e) => { setNote(e.target.value) }}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className='modal-footer'>
                    <Button type='submit' className={classes.button}>
                        Add Word
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

const translatedMeaningStyle = {
    width: '85%',
    display: 'inline'
}

const translateButtonStyle = {
    display: 'inline',
    cursor: 'pointer',
    margin: '0 0.5rem',
}

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: theme.palette.primary.main
    }
}))