import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Tabs, Tab } from '@material-ui/core'
import AlertCountBadge from '../reusableComponents/AlertCountBadge'
import { useSelector } from 'react-redux'

export default function DiaryTabBar(props) {
    const classes = useStyles()
    const notificationsForReceivedSharedDiaryPosts = useSelector(state => state.notifications.diaryPostsSharedWithMe)

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
                <Tab
                    className={classes.tab}
                    label={
                        <span>
                            Shared with Me <AlertCountBadge count={notificationsForReceivedSharedDiaryPosts.length} />
                        </span>
                    }
                />
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