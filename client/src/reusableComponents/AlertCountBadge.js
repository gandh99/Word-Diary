import React from 'react'

export default function AlertCountBadge(props) {
    const badgeStyle = {
        backgroundColor: 'red',
        fontSize: '12px',
        color: 'white',
        borderRadius: 50,
        padding: '0.1rem 0.5rem',
        visibility: props.count > 0 ? 'visible' : 'hidden'
    }

    return (
        <span style={badgeStyle}>
            {props.count >= 100 ? '99+' : props.count}
        </span>
    )
}