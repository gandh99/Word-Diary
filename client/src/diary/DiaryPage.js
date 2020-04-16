import React, { useState } from 'react'
import './diary.css'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import AddDiaryPostModal from './AddDiaryPostModal'
import ShareDiaryPostModal from './ShareDiaryPostModal'
import { useDispatch, useSelector } from 'react-redux'
import CustomSnackbar from '../reusableComponents/CustomSnackbar'
import DiaryTabBar from './DiaryTabBar'
import AllPostsTabPanel from './AllPostsTabPanel'
import StarredPostsTabPanel from './StarredPostsTabPanel'
import { hideShareDiaryPostModal, showAddDiaryPostModal, hideAddDiaryPostModal } from '../redux/actions/modalDisplayActions'
import PostsSharedWithMeTabPanel from './PostsSharedWithMeTabPanel'

export default function DiaryPage(props) {
    const dispatch = useDispatch()

    // For tab bar
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const handleTabChange = (event, newValue) => {
        setSelectedTabIndex(newValue)
    }

    // Tab content
    const tabContent = [
        <AllPostsTabPanel />,
        <StarredPostsTabPanel />,
        <PostsSharedWithMeTabPanel />
    ]

    // For showing/hiding the CustomSnackbar
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState('')
    const displaySnackbar = (message, severity) => {
        setSnackbarSeverity(severity)
        setSnackbarMessage(message)
        setShowSnackbar(true)
    }

    return (
        <>
            <DiaryTabBar
                selectedTabIndex={selectedTabIndex}
                handleTabChange={handleTabChange}
            />
            <div className='tab-content-area'>
                <AddDiaryPostModal
                    show={useSelector(state => state.modalDisplay.displayAddDiaryPostModal)}
                    onHide={() => dispatch(hideAddDiaryPostModal())}
                    displaySnackbar={displaySnackbar}
                />
                <ShareDiaryPostModal
                    show={useSelector(state => state.modalDisplay.displayShareDiaryPostModal)}
                    onHide={() => dispatch(hideShareDiaryPostModal())}
                    displaySnackbar={displaySnackbar}
                />
                {tabContent[selectedTabIndex]}
                <Fab
                    color="secondary"
                    aria-label="add"
                    style={fabStyle}
                    onClick={() => dispatch(showAddDiaryPostModal())}>
                    <AddIcon />
                </Fab>
                <CustomSnackbar
                    message={snackbarMessage}
                    show={showSnackbar}
                    setShowSnackbar={setShowSnackbar}
                    severity={snackbarSeverity}
                />
            </div>
        </>
    )
}

const fabStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px'
}