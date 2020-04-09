import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fade, makeStyles } from '@material-ui/core/styles'
import { Modal, Button, Form } from 'react-bootstrap'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { userSearchAction } from '../redux/actions/friendsActions'

export default function AddFriendModal(props) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [inputString, setInputString] = useState('')
    const userSearch = (searchString) => dispatch(userSearchAction(searchString))

    const onSearch = (event, searchString) => {
        event.preventDefault()

        // Validate input
        if (!inputIsValid(searchString)) {
            return
        }

        // Add the diary entry
        userSearch(searchString)
    }

    const onHide = () => {
        props.onHide()
        setInputString('')
    }

    const inputIsValid = (inputString) => {
        return (inputString.length > 0)
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
                        value={inputString}
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => {
                            setInputString(e.target.value)
                            onSearch(e, e.target.value)
                        }}
                    />
                </div>
            </Modal.Header>
            <Form>
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