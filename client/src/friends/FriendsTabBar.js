import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Tabs, Tab } from '@material-ui/core'

export default function FriendsTabBar(props) {
    const classes = useStyles()

    return (
        <Paper className={classes.tabs}>
            <Tabs
                value={props.selectedTabIndex}
                onChange={(e, newValue) => props.handleTabChange(e, newValue)}
                indicatorColor="primary"
                textColor="primary"
                centered >
                <Tab label='All' />
                <Tab label='Pending' />
            </Tabs>
        </Paper>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    tabs: {
        flexGrow: 1,
        position: 'sticky',
        top: '0',
        zIndex: '2'
    },
}))