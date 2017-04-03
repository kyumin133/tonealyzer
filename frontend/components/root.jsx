import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
// import { Switch, HashRouter } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux';

import App from "./app";
import Home from "./home";
import Hello from "./hello";

const Root = ({ store, history }) => {
  console.log(ConnectedRouter);
  return <Provider store={ store }>
    <ConnectedRouter history={history}>
      <div>
        <Route path="/" exact component={ Home } />
        <Route path="/test" component={ Hello } />
      </div>
    </ConnectedRouter>
  </Provider>
};

const _redirectIfLoggedIn = (nextState, replace) => {
  if (window.currentUser) {
    replace({ nextPathName: nextState.location.pathname }, '/home')
  }
}

const _ensureLoggedIn = (nextState, replace) => {
  if (!window.currentUser) {
    replace({ nextPathName: nextState.location.pathname }, '/login')
  }
}

export default Root;
