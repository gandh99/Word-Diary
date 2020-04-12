import React from 'react'
import EmptyContentPlaceholder from '../homePage/EmptyContentPlaceholder'
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import PendingFriendCard from './PendingFriendCard'

export default function PendingFriendsTabPanel() {
    const dispatch = useDispatch()
    const pendingFriends = useSelector(state => state.friends.friendRequestsIssuedToMe)

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
                            // refresh={() => dispatch(getDiaryPostsAction())}
                            // displaySnackbar={displaySnackbar}
                            />
                        ))
                        }
                    </Grid>
            }
        </div>
    )
}

const gridContentAreaStyle = {
    padding: '2rem 2rem 6rem 2rem',
}