import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';

import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  let store = {};

  let preloadedState =  {
                            session: {
                              currentUser: window.currentUser,
                              errors: []
                            }
                          };

  if (window.currentUser !== undefined)
    store = configureStore(preloadedState);
  else {
    store = configureStore();
  }

  const root = document.getElementById('root');
  window.store = store;

  document.addEventListener('keydown', (e) => {
    if (!window.currentUser) {
      return;
    }
  });

  ReactDOM.render(<Root store={ store }/>, root);
});
