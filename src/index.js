import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/browser';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import store from './store';
import Routes from './components/Routes';

const routing = (
  <Provider store={store}>
    <Routes />
  </Provider>
);

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
});
ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
