import React from 'react'
import { Router, Route, Redirect } from 'react-router-dom'

export default function HomePage(props) {
    return (
        <Route render={props => (
            localStorage.getItem('accessToken')
                ? <>Hi, you're in your homepage!</>
                // ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
    )
}
