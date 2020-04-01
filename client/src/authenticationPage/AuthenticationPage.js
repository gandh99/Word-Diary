import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom"
import Header from './Header'
import Banner from './Banner'
import Login from './Login'

export default function AuthenticationPage() {
    return (
        <Router>
            <Header />
            <Banner />
            <Switch>
                <Redirect from="/" exact to="/login" />
                <Route path='/login'>
                    <Login />
                </Route>
            </Switch>
        </Router>
    )
}
