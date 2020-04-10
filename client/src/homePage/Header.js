import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Hidden } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

export default function Header(props) {
    const classes = useStyles()

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
            </div>
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
}))