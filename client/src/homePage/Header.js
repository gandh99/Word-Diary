import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Typography } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import NotificationsIcon from '@material-ui/icons/Notifications'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import MenuBookIcon from '@material-ui/icons/MenuBook'

export default function Header(props) {
    const classes = useStyles()
    const [selectedTabIndex, setSelectedTabIndex] = React.useState(0)

    const handleChange = (event, newValue) => {
        setSelectedTabIndex(newValue)
        props.setTabContentIndex(newValue)
    }

    return (
        <>
            <Typography className={classes.header} component="h4">
                Word Diary
            </Typography>
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

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    header: {
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        marginTop: '1.5rem',
        marginBottom: '0.3rem',
    },
    tabs: {
        flexGrow: 1,
        position: 'sticky',
        top: '0'
    }
}))