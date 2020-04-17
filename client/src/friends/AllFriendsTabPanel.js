import React, { useState } from 'react'
import EmptyContentPlaceholder from '../homePage/EmptyContentPlaceholder'
import { Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import AcceptedFriendCard from './AcceptedFriendCard'
import CustomSnackbar from '../reusableComponents/CustomSnackbar'

export default function AllFriendsTabPanel() {
    const allFriends = useSelector(state => state.friends.allFriends)

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
                allFriends.length <= 0
                    ? <EmptyContentPlaceholder />
                    : <Grid
                        container
                        spacing={2}
                        direction="row"
                        justify="flex-start"
                        alignItems="center" >
                        {allFriends.map(friend => (
                            <AcceptedFriendCard
                                key={friend._id}
                                friend={friend}
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