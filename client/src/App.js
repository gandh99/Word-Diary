import React from 'react';
import './App.css';
import AuthenticationPage from './authenticationPage/AuthenticationPage';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {
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
