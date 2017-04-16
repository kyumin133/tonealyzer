import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';

import configureStore from './store/store';

// import * as APIUtil from './util/personality_api_util';
import * as actions from './actions/personality_actions';
import { login, logout, loginDemoUser } from './util/session_api_util';
window.login = login;
window.logout = logout;
window.loginDemoUser = loginDemoUser;
import { requestLogin, requestLogout, requestDemoUser } from './actions/session_actions';
window.requestLogin = requestLogin;
window.requestLogout = requestLogout;
window.requestDemoUser = requestDemoUser;

document.addEventListener('DOMContentLoaded', () => {
  let store = {};

  if (window.currentUser) {
    let preloadedState = { session: {
                             currentUser: window.currentUser,
                           errors: [] }
                         };
    store = configureStore(preloadedState);
  } else {
    store = configureStore();
  }

  window.fetchPersonality = actions.fetchPersonality;
  window.updatePersonality = actions.updatePersonality;

  const root = document.getElementById('root');
  window.store = store;

  ReactDOM.render(<Root store={ store } />, root);
});
