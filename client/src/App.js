import React, { useEffect } from 'react';
import './App.css';
import AuthenticationPage from './authenticationPage/AuthenticationPage';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme'
import { Provider } from 'react-redux'
import store from './redux/store'
import { Switch, Route, Router, BrowserRouter, Redirect } from 'react-router-dom';
import HomePage from './homePage/HomePage';
import Login from './authenticationPage/Login';
import Register from './authenticationPage/Register';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route exact path='/' component={HomePage} />
              <Redirect from='*' to='/' />
            </Switch>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
