import React, { useState } from 'react'
import './homepage.css'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Header from './Header'
import Overview from '../overview/Overview'
import Diary from '../diary/Diary'
import Notifications from '../notifications/Notifications'
import Friends from '../friends/Friends'
import DrawerMenu from './DrawerMenu'

export default function HomePage(props) {
    const classes = useStyles()

    // For drawer
    const [mobileOpen, setMobileOpen] = useState(false)

    // For tabs
    const [tabContentIndex, setTabContentIndex] = useState(0)
    const tabContent = [
        <Overview />,
        <Diary />,
        <Notifications />,
        <Friends />,
    ]

    return (
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

                <div className='tab-area'>
                    {tabContent[tabContentIndex]}
                </div>
            </div>
        </div>
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
}))