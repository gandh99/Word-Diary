import React, { useState, useEffect } from 'react'
import './diary.css'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import AddDiaryPostModal from './AddDiaryPostModal'
import { useDispatch, useSelector } from 'react-redux'
import { getDiaryPostsAction } from '../redux/actions/diaryActions'
import CustomSnackbar from '../reusableComponents/CustomSnackbar'
import DiaryTabBar from './DiaryTabBar'
import AllPostsTabPanel from './AllPostsTabPanel'
import StarredPostsTabPanel from './StarredPostsTabPanel'

export default function DiaryPage(props) {
    const dispatch = useDispatch()

    // For tab bar
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const handleTabChange = (event, newValue) => {
        setSelectedTabIndex(newValue)
    }

    // For handling the AddDiaryPostModal
    const [showAddDiaryPostModal, setShowAddDiaryPostModal] = useState(false)

    // Tab content
    const tabContent = [
        <AllPostsTabPanel />,
        <StarredPostsTabPanel />,
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

    useEffect(() => {
        dispatch(getDiaryPostsAction())
    }, [])

    return (
        <>
            <DiaryTabBar
                selectedTabIndex={selectedTabIndex}
                handleTabChange={handleTabChange}
            />
            <div className='tab-content-area'>
                <AddDiaryPostModal
                    show={showAddDiaryPostModal}
                    onHide={() => setShowAddDiaryPostModal(false)}
                    displaySnackbar={displaySnackbar}
                />
                {tabContent[selectedTabIndex]}
                <Fab
                    color="secondary"
                    aria-label="add"
                    style={fabStyle}
                    onClick={() => setShowAddDiaryPostModal(true)}>
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