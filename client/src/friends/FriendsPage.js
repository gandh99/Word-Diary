import React, { useState } from 'react'
import './friends.css'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import Fab from '@material-ui/core/Fab'
import AddFriendModal from './AddFriendModal'
import FriendsTabBar from './FriendsTabBar'

export default function FriendsPage(props) {
    const classes = useStyles()
    const dispatch = useDispatch()

    // For tab bar
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const handleTabChange = (event, newValue) => {
        setSelectedTabIndex(newValue)
    }

    // For handling the AddFriendModal
    const [showAddFriendModal, setShowAddFriendModal] = useState(false)

    return (
        <>
            <FriendsTabBar
                selectedTabIndex={selectedTabIndex}
                handleTabChange={handleTabChange}
            />
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
        </>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        position: 'absolute',
        top: '-20px',
        left: '20px'
    },
    title: {
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        marginTop: '1.5rem',
        marginBottom: '0.3rem',
    },
    tabs: {
        flexGrow: 1,
        position: 'sticky',
        top: '0',
        zIndex: '2'
    },
}))

const fabStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px'
}