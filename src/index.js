import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import store from './store';
import Routes from './components/Routes';

import 'typeface-open-sans';

const routing = (
  <Provider store={store}>
    <Routes />
  </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
