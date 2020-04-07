import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Bear from '../images/bear.png'
import { Typography } from '@material-ui/core'

export default function EmptyContentPlaceholder() {
    const classes = useStyles()

    return (
        <div>
            <img src={Bear} style={bearStyle} alt={"Rawr! I'm a bear!"} />
            <Typography component="h5" className={classes.bearCaption}>
                Oops! Nothing to see here!
            </Typography>
        </div>
    )
}

const bearStyle = {
    width: '100px',
    marginTop: '150px'
}

const useStyles = makeStyles(theme => ({
    bearCaption: {
        color: theme.palette.text.tertiary,
        fontWeight: 'bold',
    }
}))