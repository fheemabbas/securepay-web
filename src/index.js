import 'core-js/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from "./state/store";
import { getItem } from "./services/localstorage.service";

import * as serviceWorker from './serviceWorker';
import PubnubProvider from './pubnub.provider';

import './index.scss';

let user = getItem('user');
const token = getItem('token');

export const store = configureStore({
  auth: {
    isAuthenticated: !!user,
    session: { user, token },
  }
});

ReactDOM.render(
  <Provider store={store}>
    <PubnubProvider />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
