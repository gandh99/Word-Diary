import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Tabs, Tab } from '@material-ui/core'

export default function DiaryTabBar(props) {
    const classes = useStyles()

    return (
        <Paper className={classes.tabs}>
            <Tabs
                value={props.selectedTabIndex}
                onChange={(e, newValue) => props.handleTabChange(e, newValue)}
                indicatorColor="primary"
                textColor="primary"
                centered >
                <Tab className={classes.tab} label='All' />
                <Tab className={classes.tab} label='Starred' />
                <Tab className={classes.tab} label='Shared with Me' />
            </Tabs>
        </Paper>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    tabs: {
        borderRadius: 0,
        flexGrow: 1,
        position: 'sticky',
        top: '0',
        zIndex: '2'
    },
    tab: {
        fontSize: 16,
        textTransform: 'none'
    }
}))