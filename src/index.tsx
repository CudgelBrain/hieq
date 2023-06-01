import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Import App Router & App Store
import AppRouter from './routes';
import { store } from './app/store';

// Import Global Stylings
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('main-wrapper'),
);
