import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import { createBrowserHistory } from 'history';

import configureStore from './store/store';



document.addEventListener('DOMContentLoaded', () => {
  let store = {};
  const history = createBrowserHistory();

  let preloadedState =  {
                            session: {
                              currentUser: window.currentUser,
                              errors: []
                            }
                          };

  if (!!window.currentUser)
    store = configureStore(history, preloadedState);
  else {
    store = configureStore(history);
  }

  const root = document.getElementById('root');
  window.store = store;

  ReactDOM.render(<Root store={ store } history={ history }/>, root);
});
