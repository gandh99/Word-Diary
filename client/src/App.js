import React from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme'
import { Provider } from 'react-redux'
import store from './redux/store'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import HomePage from './homePage/HomePage';
import Login from './authenticationPage/Login';
import Register from './authenticationPage/Register';
import { PrivateRoute } from './reusableComponents/PrivateRoute';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <PrivateRoute exact path='/' component={HomePage} />
              <Redirect from='*' to='/' />
            </Switch>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;