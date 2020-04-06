import React, { useState } from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import EmptyContentPlaceholder from '../homePage/EmptyContentPlaceholder'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import AddDiaryPostModal from './AddDiaryPostModal'

export default function Diary() {
    // Add word modal
    const [showAddDiaryPostModal, setShowAddDiaryPostModal] = useState(false)

    const exampleContent = [
        // {
        //     word: '执着',
        //     translation: 'Persistent',
        //     exampleSentence: '他很执着。'
        // },
        // {
        //     word: '执着',
        //     translation: 'Persistent',
        //     exampleSentence: '他很执着。'
        // },
        // {
        //     word: '执着',
        //     translation: 'Persistent',
        //     exampleSentence: '他很执着。'
        // },
    ]

    return (
        <div>
            <AddDiaryPostModal
                show={showAddDiaryPostModal}
                onHide={() => { setShowAddDiaryPostModal(false) }}
            />
            <div className='content-area' style={contentAreaStyle}>
                {
                    exampleContent.length <= 0
                        ? <EmptyContentPlaceholder />
                        : exampleContent.map(content => (
                            <Card style={cardStyle}>
                                <CardContent>
                                    <div>{content.word}</div>
                                    <div>{content.translation}</div>
                                    <div>{content.exampleSentence}</div>
                                </CardContent>
                            </Card>
                        ))
                }
            </div>
            <Fab
                color="secondary"
                aria-label="add"
                style={fabStyle}
                onClick={() => setShowAddDiaryPostModal(true)}>
                <AddIcon />
            </Fab>
        </div>
    )
}

const contentAreaStyle = {
    marginTop: '20px'
}

const cardStyle = {
    margin: '1rem auto',
    width: '80%'
}

const fabStyle = {
    position: 'absolute',
    bottom: '20px',
    right: '20px'
}