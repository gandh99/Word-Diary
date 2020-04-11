import React from 'react'
import EmptyContentPlaceholder from '../homePage/EmptyContentPlaceholder'
import { Grid } from '@material-ui/core'

export default function PendingFriendsTabPanel() {
    const pendingFriends = []

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
                        {/* {diaryPosts.map(post => (
                            <DiaryPost
                                key={post._id}
                                post={post}
                                refresh={() => dispatch(getDiaryPostsAction())}
                                displaySnackbar={displaySnackbar}
                            />
                        ))
                        } */}
                    </Grid>
            }
        </div>
    )
}

const gridContentAreaStyle = {
    padding: '2rem 2rem 6rem 2rem',
}