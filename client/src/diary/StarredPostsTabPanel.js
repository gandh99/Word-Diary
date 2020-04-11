import React, { useEffect } from 'react'
import EmptyContentPlaceholder from '../homePage/EmptyContentPlaceholder'
import { Grid } from '@material-ui/core'
import DiaryPost from './DiaryPost'
import { useDispatch, useSelector } from 'react-redux'
import { getDiaryPostsAction } from '../redux/actions/diaryActions'

export default function StarredPostsTabPanel(props) {
    const dispatch = useDispatch()
    const starredDiaryPosts = useSelector(state => state.diary.allDiaryPosts.filter(post => post.starred))
    
    return (
        <div style={gridContentAreaStyle}>
            {
                starredDiaryPosts.length <= 0
                    ? <EmptyContentPlaceholder />
                    : <Grid
                        container
                        spacing={2}
                        direction="row"
                        justify="flex-start"
                        alignItems="center" >
                        {starredDiaryPosts.map(post => (
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
    )
}

const gridContentAreaStyle = {
    padding: '2rem 2rem 6rem 2rem',
}