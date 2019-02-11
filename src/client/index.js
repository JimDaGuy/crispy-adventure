import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0d47a1'
    },
    secondary: {
      main: '#e91e63'
    }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
