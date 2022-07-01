import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from 'styled-components';
import { MantineProvider, LoadingOverlay } from '@mantine/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { AppProviders } from './context';
import reportWebVitals from './reportWebVitals';
import { lightTheme, mantineThemeOverrides } from './themes';

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <MantineProvider theme={mantineThemeOverrides}>
        <ThemeProvider theme={lightTheme}>
          <Suspense fallback={<LoadingOverlay visible />}>
            <App />
          </Suspense>
          <ToastContainer
            autoClose={4000}
             hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
          />
        </ThemeProvider>
      </MantineProvider>
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
