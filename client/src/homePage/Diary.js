import React from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import EmptyContentPlaceholder from './EmptyContentPlaceholder'

export default function Diary() {
    return (
        <div>
            <EmptyContentPlaceholder />
            <Fab color="secondary" aria-label="add" style={fabStyle}>
                <AddIcon />
            </Fab>
        </div>
    )
}

const fabStyle = {
    position: 'absolute',
    bottom: '20px',
    right: '20px'
}