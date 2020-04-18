import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Divider, List, ListItem, ListItemIcon, ListItemText, Hidden } from '@material-ui/core';
import { Link } from "react-router-dom"
import Drawer from '@material-ui/core/Drawer'
import HomeIcon from '@material-ui/icons/Home'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import SettingsIcon from '@material-ui/icons/Settings'
import HelpIcon from '@material-ui/icons/Help'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { logoutUserAction } from '../redux/actions/authenticationActions'
import { useDispatch, useSelector } from 'react-redux'
import AlertCountBadge from '../reusableComponents/AlertCountBadge'
import AccountCircle from '../images/account_circle.png'
import HeaderBackground from '../images/header.jpg'

export default function DrawerMenu(props) {
    const { container } = props
    const dispatch = useDispatch()
    const classes = useStyles()
    const theme = useTheme()
    const [activeLink, setActiveLink] = useState('')

    // Get the user and notifications data
    const user = useSelector(state => state.authentication.userData)
    const notificationsForReceivedFriendRequests = useSelector(state => state.notifications.receivedFriendRequests)
    const notificationsForReceivedSharedDiaryPosts = useSelector(state => state.notifications.diaryPostsSharedWithMe)

    // Utility links (icon + text)
    const utilityLinks = [
        { icon: <SettingsIcon />, text: 'Settings' },
        { icon: <HelpIcon />, text: 'Help' },
    ]

    const handleDrawerToggle = () => {
        props.setDrawerOpen(!props.drawerOpen);
    };

    const drawer = (
        <div>
            {/* <div className={classes.toolbar} /> */}
            <div className={classes.header}>
                <div className={classes.displayPictureArea}>
                    <img src={AccountCircle} className={classes.displayPicture} alt='Account Icon' />
                </div>
                <div className={classes.username}>
                    {user ? user.username : 'Not logged in'}
                </div>
            </div>
            <Divider />
            <List className={classes.body}>
                <Link to={'/'} style={{ textDecoration: 'none' }} className={classes.link}>
                    <ListItem
                        selected={activeLink === 'Home'}
                        onClick={() => setActiveLink('Home')}
                        button
                        key={'Home'}>
                        <ListItemIcon>{<HomeIcon />}</ListItemIcon>
                        <ListItemText primary={'Home'} />
                    </ListItem>
                </Link>
                <Link to={'/diary'} style={{ textDecoration: 'none' }} className={classes.link}>
                    <ListItem
                        selected={activeLink === 'Diary'}
                        onClick={() => setActiveLink('Diary')}
                        button
                        key={'Diary'}>
                        <ListItemIcon>{<MenuBookIcon />}</ListItemIcon>
                        <ListItemText primary={'Diary'} />
                        <AlertCountBadge count={notificationsForReceivedSharedDiaryPosts.length} />
                    </ListItem>
                </Link>
                <Link to={'/friends'} style={{ textDecoration: 'none' }} className={classes.link}>
                    <ListItem
                        selected={activeLink === 'Friends'}
                        onClick={() => setActiveLink('Friends')}
                        button
                        key={'Friends'}>
                        <ListItemIcon>{<PeopleAltIcon />}</ListItemIcon>
                        <ListItemText primary={'Friends'} />
                        <AlertCountBadge count={notificationsForReceivedFriendRequests.length} />
                    </ListItem>
                </Link>
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
                    open={props.drawerOpen}
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
const headerImage = "url(" + HeaderBackground + ")"
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
        borderRight: 'solid 1px lightgray'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '1.5rem',
        backgroundImage: headerImage,
        border: 'none'
    },
    displayPictureArea: {
        minWidth: '50px',
        maxWidth: '50px',
    },
    displayPicture: {
        width: '100%',
    },
    username: {
        fontSize: '1rem',
        marginLeft: '1rem',
        fontWeight: 'bold',
        color: theme.palette.primary.contrastText
    },
    body: {
    },
    link: {
        color: theme.palette.text.primary
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
}))
