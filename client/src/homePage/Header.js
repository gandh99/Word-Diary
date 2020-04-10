import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Typography, Hidden } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import NotificationsIcon from '@material-ui/icons/Notifications'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import SettingsMenu from './SettingsMenu'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import DrawerMenu from './DrawerMenu'

export default function Header(props) {
    const classes = useStyles()

    // For tab bar
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)

    const handleChange = (event, newValue) => {
        setSelectedTabIndex(newValue)
        props.setTabContentIndex(newValue)
    }

    return (
        <>
            <div className='header-area' style={headerAreaStyle}>
                <Hidden smUp>
                    <IconButton onClick={() => props.setMobileOpen(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon color='primary' fontSize='large' />
                    </IconButton>
                </Hidden>
                <Typography className={classes.title} component="h4">
                    Word Diary
                </Typography>
                <SettingsMenu />
            </div>
            <Paper className={classes.tabs}>
                <Tabs
                    value={selectedTabIndex}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered >
                    <Tab icon={<HomeIcon />} />
                    <Tab icon={<MenuBookIcon />} />
                    <Tab icon={<NotificationsIcon />} />
                    <Tab icon={<PeopleAltIcon />} />
                </Tabs>
            </Paper>
        </>
    )
}

const headerAreaStyle = {
    position: 'relative'
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        position: 'absolute',
        top: '-20px',
        left: '20px'
    },
    title: {
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        marginTop: '1.5rem',
        marginBottom: '0.3rem',
    },
    tabs: {
        flexGrow: 1,
        position: 'sticky',
        top: '0',
        zIndex: '2'
    },
}))