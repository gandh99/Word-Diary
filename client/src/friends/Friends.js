import React, { useState } from 'react'
import './friends.css'
import { useDispatch, useSelector } from 'react-redux'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import Fab from '@material-ui/core/Fab'
import EmptyContentPlaceholder from '../homePage/EmptyContentPlaceholder'
import { Grid } from '@material-ui/core'
import AddFriendModal from './AddFriendModal'

export default function Friends() {
    const dispatch = useDispatch()

    // For handling the AddFriendModal
    const [showAddFriendModal, setShowAddFriendModal] = useState(false)

    return (
        <div className='tab-content-area'>
            <AddFriendModal
                show={showAddFriendModal}
                onHide={() => setShowAddFriendModal(false)}
                // refresh={() => dispatch(getDiaryPostsAction())}
                // showSnackbar={
                //     (message, severity) => {
                //         setSnackbarSeverity(severity)
                //         setSnackbarMessage(message)
                //         setShowSnackbar(true)
                //     }
                // }
            />
            <Fab
                color="secondary"
                aria-label="add"
                style={fabStyle}
                onClick={() => setShowAddFriendModal(true)} >
                <PersonAddIcon />
            </Fab>
        </div>
    )
}

const fabStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px'
}