import React, { useState, useEffect } from 'react'
import './homepage.css'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Header from './Header'
import DiaryPage from '../diary/DiaryPage'
import FriendsPage from '../friends/FriendsPage'
import DrawerMenu from './DrawerMenu'
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom"
import { PrivateRoute } from '../reusableComponents/PrivateRoute'
import { useDispatch } from 'react-redux'
import { getFriendsAction, getFriendRequestsIssuedToMeAction } from '../redux/actions/friendsActions'
import { getDiaryPostsAction, getDiaryPostsSharedWithMeAction } from '../redux/actions/diaryActions'
import { getSharedDiaryPostsAction, getReceivedFriendRequestsAction } from '../redux/actions/notificationsActions'

export default function HomePage(props) {
    const classes = useStyles()
    const dispatch = useDispatch()

    // For drawer
    const [drawerOpen, setDrawerOpen] = useState(false)

    useEffect(() => {
        dispatch(getFriendsAction())
        dispatch(getFriendRequestsIssuedToMeAction())
        dispatch(getReceivedFriendRequestsAction())
        dispatch(getDiaryPostsAction())
        dispatch(getDiaryPostsSharedWithMeAction())
        dispatch(getSharedDiaryPostsAction())
    }, [])

    return (
        <Router>
            <div className={classes.root}>
                <DrawerMenu drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
                <div className={clsx(classes.contentArea, {
                    [classes.contentShift]: drawerOpen,
                })}>
                    <Header
                        drawerOpen={drawerOpen}
                        setDrawerOpen={setDrawerOpen}
                    />
                    <div className={classes.pageArea}>
                        <Switch>
                            <PrivateRoute path='/diary' component={DiaryPage} />
                            <PrivateRoute path='/friends' component={FriendsPage} />
                            <Redirect from='/' to='/diary' />
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row'
    },
    contentArea: {
        flexGrow: 1,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    pageArea: {
    }
}))