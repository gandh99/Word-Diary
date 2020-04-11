import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Divider, List, ListItem, ListItemIcon, ListItemText, Hidden } from '@material-ui/core';
import { Link } from "react-router-dom"
import Drawer from '@material-ui/core/Drawer'
import HomeIcon from '@material-ui/icons/Home'
import NotificationsIcon from '@material-ui/icons/Notifications'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import SettingsIcon from '@material-ui/icons/Settings'
import HelpIcon from '@material-ui/icons/Help'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { logoutUserAction } from '../redux/actions/authenticationActions';
import { useDispatch } from 'react-redux';

export default function DrawerMenu(props) {
    const { container } = props
    const dispatch = useDispatch()
    const classes = useStyles()
    const theme = useTheme()

    // Page links (icon + text)
    const pageLinks = [
        { icon: <HomeIcon />, text: 'Home' },
        { icon: <MenuBookIcon />, text: 'My Diary', link: '/diary' },
        { icon: <NotificationsIcon />, text: 'Notifications' },
        { icon: <PeopleAltIcon />, text: 'Friends', link: '/friends' },
    ]

    // Utility links (icon + text)
    const utilityLinks = [
        { icon: <SettingsIcon />, text: 'Settings' },
        { icon: <HelpIcon />, text: 'Help' },
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
                    <Link to={page.link} style={{ textDecoration: 'none' }}>
                        <ListItem button key={page.text}>
                            <ListItemIcon>{page.icon}</ListItemIcon>
                            <ListItemText primary={page.text} />
                        </ListItem>
                    </Link>
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
                <ListItem button onClick={() => dispatch(logoutUserAction())}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Logout'} />
                </ListItem>
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
                <div className={classes.permanentDrawer}>
                    {drawer}
                </div>
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
    permanentDrawer: {
        position: 'fixed',
        height: '100vh',
        width: drawerWidth,
        padding: '0 1.5rem',
        borderRight: 'solid 1px lightgray'
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
