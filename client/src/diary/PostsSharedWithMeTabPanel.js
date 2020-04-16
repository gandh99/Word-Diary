import React, { useState } from 'react'
import EmptyContentPlaceholder from '../homePage/EmptyContentPlaceholder'
import { Grid } from '@material-ui/core'
import SharedDiaryPost from './SharedDiaryPost'
import { useSelector } from 'react-redux'
import CustomSnackbar from '../reusableComponents/CustomSnackbar'

export default function PostsSharedWithMeTabPanel() {
    const sharedDiaryPosts = useSelector(state => state.diary.diaryPostsSharedWithMe)

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
        <div style={gridContentAreaStyle}>
            {
                sharedDiaryPosts.length <= 0
                    ? <EmptyContentPlaceholder />
                    : <Grid
                        container
                        spacing={2}
                        direction="row"
                        justify="flex-start"
                        alignItems="center" >
                        {sharedDiaryPosts.map(sharedPost => (
                            <SharedDiaryPost
                                key={sharedPost._id}
                                sharedPost={sharedPost}
                                displaySnackbar={displaySnackbar}
                            />
                        ))
                        }
                    </Grid>
            }
            <CustomSnackbar
                message={snackbarMessage}
                show={showSnackbar}
                setShowSnackbar={setShowSnackbar}
                severity={snackbarSeverity}
            />
        </div>
    )
}

const gridContentAreaStyle = {
    padding: '2rem 2rem 6rem 2rem',
}