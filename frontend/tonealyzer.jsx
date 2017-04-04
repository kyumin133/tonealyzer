import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';

import configureStore from './store/store';

// import * as APIUtil from './util/blurb_api_util';
import * as actions from './actions/blurb_actions';

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
  window.fetchBlurbs = actions.fetchBlurbs;
  window.fetchBlurbs = actions.fetchBlurbs;
  window.createBlurb = actions.createBlurb;


  const root = document.getElementById('root');
  window.store = store;


  ReactDOM.render(<Root store={ store } />, root);
});
