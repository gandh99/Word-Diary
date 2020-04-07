import React, { useState } from 'react'
import './homepage.css'
import Header from './Header'
import Overview from '../overview/Overview'
import Diary from '../diary/Diary'
import Notifications from '../notifications/Notifications'
import Friends from '../friends/Friends'

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
            <div className='tab-area'>
                {tabContent[tabContentIndex]}
            </div>
        </>
    )
}