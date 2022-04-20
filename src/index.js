import React from 'react';
import ReactDOM from 'react-dom';
import SnackbarProvider from 'react-simple-snackbar'
import { App } from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <SnackbarProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SnackbarProvider>,
  document.getElementById('root'),
);
