import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SettingsIcon from '@material-ui/icons/Settings'

export default function SettingsMenu() {
    const classes = useStyles()

    return (
        <SettingsIcon
            htmlColor={settingsIconDefaultColor}
            style={settingsIconStyle}
            className={classes.settingsIcon} />
    )
}

const settingsIconStyle = {
    cursor: 'pointer'
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