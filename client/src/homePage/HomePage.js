import React, { useState } from 'react'
import Header from './Header'
import Overview from './Overview'
import Diary from './Diary'
import Notifications from './Notifications'
import Friends from './Friends'

export default function HomePage(props) {
    const [tabContentIndex, setTabContentIndex] = useState(0)
    const tabContent = [
        <Overview />,
        <Diary />,
        <Notifications />,
        <Friends />,
    ]

    return (
        <>
            <Header 
                setTabContentIndex={setTabContentIndex}
            />
            {tabContent[tabContentIndex]}
        </>
    )
}
