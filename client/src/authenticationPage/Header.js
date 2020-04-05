import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default function Header() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position="static" color='transparent' elevation={0}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon className={classes.button} />
                    </IconButton>
                    <div className={classes.headerButtonGroup}>
                        <Link to='/login'>
                            <Button className={classes.button}>Login</Button>
                        </Link>
                        <Link to='/register'>
                            <Button className={classes.button}>Register</Button>
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    headerButtonGroup: {
        float: 'right',
        position: 'absolute',
        right: '20px',
    },
    button: {
        color: theme.palette.primary.contrastText
    }
}))