import React, { useState, useEffect } from 'react'
import './diary.css'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import EmptyContentPlaceholder from '../homePage/EmptyContentPlaceholder'
import AddDiaryPostModal from './AddDiaryPostModal'
import { useDispatch, useSelector } from 'react-redux'
import { getDiaryPostsAction } from '../redux/actions/diaryActions'
import CustomSnackbar from '../reusableComponents/CustomSnackbar'
import { Grid } from '@material-ui/core'
import DiaryPost from './DiaryPost'
import DiaryTabBar from './DiaryTabBar'

export default function DiaryPage(props) {
    const dispatch = useDispatch()
    const diaryPosts = useSelector(state => state.diary.allDiaryPosts)

    // For tab bar
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const handleTabChange = (event, newValue) => {
        setSelectedTabIndex(newValue)
    }

    // For handling the AddDiaryPostModal
    const [showAddDiaryPostModal, setShowAddDiaryPostModal] = useState(false)

    // For showing/hiding the CustomSnackbar
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState('')

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
                    refresh={() => dispatch(getDiaryPostsAction())}
                    showSnackbar={
                        (message, severity) => {
                            setSnackbarSeverity(severity)
                            setSnackbarMessage(message)
                            setShowSnackbar(true)
                        }
                    }
                />
                <div style={gridContentAreaStyle}>
                    {
                        diaryPosts.length <= 0
                            ? <EmptyContentPlaceholder />
                            : <Grid
                                container
                                spacing={2}
                                direction="row"
                                justify="flex-start"
                                alignItems="center" >
                                {diaryPosts.map(post => (
                                    <DiaryPost
                                        key={post._id}
                                        post={post}
                                        refresh={() => dispatch(getDiaryPostsAction())}
                                    />
                                ))
                                }
                            </Grid>
                    }
                </div>
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

const gridContentAreaStyle = {
    padding: '2rem 2rem 6rem 2rem',
}

const fabStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px'
}