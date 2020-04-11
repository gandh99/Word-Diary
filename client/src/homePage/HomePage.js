import React, { useState } from 'react'
import './homepage.css'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Header from './Header'
import Overview from '../overview/Overview'
import DiaryPage from '../diary/DiaryPage'
import Notifications from '../notifications/Notifications'
import FriendsPage from '../friends/FriendsPage'
import DrawerMenu from './DrawerMenu'
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom"
import { PrivateRoute } from '../reusableComponents/PrivateRoute'

export default function HomePage(props) {
    const classes = useStyles()

    // For drawer
    const [mobileOpen, setMobileOpen] = useState(false)

    // For tabs
    const [tabContentIndex, setTabContentIndex] = useState(0)
    const tabContent = [
        <Overview />,
        <DiaryPage />,
        <Notifications />,
        <FriendsPage />,
    ]

    return (
        <Router>
            <div className={classes.root}>
                <DrawerMenu mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
                <div className={clsx(classes.contentArea, {
                    [classes.contentShift]: mobileOpen,
                })}>
                    <Header
                        setTabContentIndex={setTabContentIndex}
                        mobileOpen={mobileOpen}
                        setMobileOpen={setMobileOpen}
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