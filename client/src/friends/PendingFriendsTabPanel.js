import React, { useState } from 'react'
import EmptyContentPlaceholder from '../homePage/EmptyContentPlaceholder'
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import PendingFriendCard from './PendingFriendCard'
import CustomSnackbar from '../reusableComponents/CustomSnackbar'
import { getFriendRequestsIssuedToMeAction, getFriendsAction } from '../redux/actions/friendsActions'

export default function PendingFriendsTabPanel() {
    const dispatch = useDispatch()
    const pendingFriends = useSelector(state => state.friends.friendRequestsIssuedToMe)

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
                pendingFriends.length <= 0
                    ? <EmptyContentPlaceholder />
                    : <Grid
                        container
                        spacing={2}
                        direction="row"
                        justify="flex-start"
                        alignItems="center" >
                        {pendingFriends.map(friend => (
                            <PendingFriendCard
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