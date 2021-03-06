import React, { useState } from 'react'
import EmptyContentPlaceholder from '../homePage/EmptyContentPlaceholder'
import { Grid } from '@material-ui/core'
import DiaryPost from './DiaryPost'
import { useSelector } from 'react-redux'
import CustomSnackbar from '../reusableComponents/CustomSnackbar'

export default function AllPostsTabPanel(props) {
    const diaryPosts = useSelector(state => state.diary.allDiaryPosts)

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