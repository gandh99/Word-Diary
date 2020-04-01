import React from 'react'
import './banner.css'

export default function Banner() {
    return (
        <div className='banner'>
            <div className='banner-content-container'>
                <div className='banner-greeting'>Welcome to</div>
                <div className='banner-title'>Word Diary</div>
                <div className='banner-description'>Record every new word you learn and master a new language.</div>
            </div>
        </div>
    )
}
