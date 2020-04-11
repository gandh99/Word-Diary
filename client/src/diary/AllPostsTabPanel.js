import React, { useEffect } from 'react'
import EmptyContentPlaceholder from '../homePage/EmptyContentPlaceholder'
import { Grid } from '@material-ui/core'
import DiaryPost from './DiaryPost'
import { useDispatch, useSelector } from 'react-redux'
import { getDiaryPostsAction } from '../redux/actions/diaryActions'

export default function AllPostsTabPanel(props) {
    const dispatch = useDispatch()
    const diaryPosts = useSelector(state => state.diary.allDiaryPosts)

    useEffect(() => {
        dispatch(getDiaryPostsAction())
    }, [])

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