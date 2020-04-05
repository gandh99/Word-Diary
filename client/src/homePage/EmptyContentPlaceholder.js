import React from 'react'
import Bear from '../images/bear.png'
import { Typography } from '@material-ui/core'

export default function EmptyContentPlaceholder() {
    return (
        <div>
            <img src={Bear} style={bearStyle} />
            <Typography component="h5">
                Oops! Nothing to see here!
            </Typography>
        </div>
    )
}

const bearStyle = {
    width: '100px',
    marginTop: '150px'
}