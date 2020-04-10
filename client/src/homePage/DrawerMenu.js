import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Divider, List, ListItem, ListItemIcon, ListItemText, Hidden } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import Drawer from '@material-ui/core/Drawer'
import HomeIcon from '@material-ui/icons/Home'
import NotificationsIcon from '@material-ui/icons/Notifications'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import SettingsIcon from '@material-ui/icons/Settings'
import HelpIcon from '@material-ui/icons/Help'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

export default function DrawerMenu(props) {
    const { container } = props
    const classes = useStyles()
    const theme = useTheme()

    // Page links (icon + text)
    const pageLinks = [
        { icon: <HomeIcon />, text: 'Home' },
        { icon: <MenuBookIcon />, text: 'My Diary' },
        { icon: <NotificationsIcon />, text: 'Notifications' },
        { icon: <PeopleAltIcon />, text: 'Friends' },
    ]

    // Utility links (icon + text)
    const utilityLinks = [
        { icon: <SettingsIcon />, text: 'Settings' },
        { icon: <HelpIcon />, text: 'Help' },
        { icon: <ExitToAppIcon />, text: 'Logout' },
    ]

    const handleDrawerToggle = () => {
        props.setMobileOpen(!props.mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {pageLinks.map((page) => (
                    <ListItem button key={page.text}>
                        <ListItemIcon>{page.icon}</ListItemIcon>
                        <ListItemText primary={page.text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {utilityLinks.map(utility => (
                    <ListItem button key={utility.text}>
                        <ListItemIcon>{utility.icon}</ListItemIcon>
                        <ListItemText primary={utility.text} />
                    </ListItem>
                ))}
            </List>
        </div>
    )

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={props.mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
    )
}

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}))
