import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import mainTheme from './layout/mainTheme';
import Pages from './Pages';
import reportWebVitals from './reportWebVitals';



ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={mainTheme}>
      <SnackbarProvider maxSnack={3} >
        <Pages />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
