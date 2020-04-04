import React, { useEffect } from 'react';
import './App.css';
import AuthenticationPage from './authenticationPage/AuthenticationPage';
import UserPage from './userPage/UserPage';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme'
import { Provider } from 'react-redux'
import store from './redux/store'
import { loadUserAction } from './redux/actions/authenticationActions';

function App() {
  useEffect(() => {
    // store.dispatch(loadUserAction())
  })

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <AuthenticationPage />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
