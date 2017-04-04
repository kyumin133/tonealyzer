import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';

import configureStore from './store/store';

import * as APIUtil from './util/personality_api_util';

document.addEventListener('DOMContentLoaded', () => {
  let store = {};



  let preloadedState =  {
                            session: {
                              currentUser: window.currentUser,
                              errors: []
                            }
                          };

  if (!!window.currentUser)
    store = configureStore(preloadedState);
  else {
    store = configureStore();
  }
  window.fetchPersonality = APIUtil.fetchPersonality;


  const root = document.getElementById('root');
  window.store = store;


  ReactDOM.render(<Root store={ store } />, root);
});
