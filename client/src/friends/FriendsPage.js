import React, { useState } from 'react'
import './friends.css'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import Fab from '@material-ui/core/Fab'
import AddFriendModal from './AddFriendModal'
import FriendsTabBar from './FriendsTabBar'
import AllFriendsTabPanel from './AllFriendsTabPanel'
import PendingFriendsTabPanel from './PendingFriendsTabPanel'
import FriendsDiaryPostsModal from '../diary/FriendsDiaryPostsModal'
import { showAddFriendModal, hideAddFriendModal, hideFriendsDiaryPostsModal } from '../redux/actions/modalDisplayActions'

export default function FriendsPage(props) {
    const classes = useStyles()
    const dispatch = useDispatch()

    // For tab bar
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const handleTabChange = (event, newValue) => {
        setSelectedTabIndex(newValue)
    }

    // Tab content
    const tabContent = [
        <AllFriendsTabPanel />,
        <PendingFriendsTabPanel />
    ]

    return (
        <>
            <FriendsTabBar
                selectedTabIndex={selectedTabIndex}
                handleTabChange={handleTabChange}
            />
            <div className='tab-content-area'>
                <AddFriendModal
                    show={useSelector(state => state.modalDisplay.displayAddFriendModal)}
                    onHide={() => dispatch(hideAddFriendModal())}
                />
                <FriendsDiaryPostsModal
                    show={useSelector(state => state.modalDisplay.displayFriendsDiaryPostsModal)}
                    onHide={() => dispatch(hideFriendsDiaryPostsModal())}
                />
                {tabContent[selectedTabIndex]}
                <Fab
                    color="secondary"
                    aria-label="add"
                    style={fabStyle}
                    onClick={() => dispatch(showAddFriendModal())} >
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
}))

const fabStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px'
}