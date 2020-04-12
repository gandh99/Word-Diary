import React from 'react'
import EmptyContentPlaceholder from '../homePage/EmptyContentPlaceholder'
import { Grid } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import AcceptedFriendCard from './AcceptedFriendCard'
import { getFriendsAction } from '../redux/actions/friendsActions'

export default function AllFriendsTabPanel() {
    const dispatch = useDispatch()
    const allFriends = useSelector(state => state.friends.allFriends)

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
                                refresh={() => dispatch(getFriendsAction())}
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