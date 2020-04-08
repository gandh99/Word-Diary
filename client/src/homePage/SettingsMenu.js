import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import SettingsIcon from '@material-ui/icons/Settings'
import { Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem } from '@material-ui/core'
import { logoutUserAction } from '../redux/actions/authenticationActions'

export default function SettingsMenu() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [openMenu, setOpenMenu] = useState(false)
    const logout = () => dispatch(logoutUserAction())

    const handleToggle = (shouldOpen) => {
        setOpenMenu(shouldOpen)
    }

    return (
        <>
            <SettingsIcon
                onClick={() => handleToggle(true)}
                htmlColor={settingsIconDefaultColor}
                style={settingsIconStyle}
                className={classes.settingsIcon} />
            <Popper open={openMenu} role={undefined} transition disablePortal style={menuPopperStyle}>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={menuGrowStyle} >
                        <Paper>
                            <ClickAwayListener onClickAway={() => handleToggle(false)}>
                                <MenuList autoFocusItem={openMenu} id="menu-list-grow">
                                    <MenuItem>Profile</MenuItem>
                                    <MenuItem onClick={logout}>Logout</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    )
}

const settingsIconStyle = {
    cursor: 'pointer'
}

const menuPopperStyle = {
    zIndex: '3',
    position: 'relative'
}

const menuGrowStyle = {
    position: 'absolute',
    top: '-5px',
    right: '30px'
}

const useStyles = makeStyles(theme => ({
    settingsIcon: {
        position: 'absolute',
        top: '0',
        right: '20px',
        cusrsor: 'pointer'
    }
}))

const settingsIconDefaultColor = '#666666'