import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from "./app";
import Home from "./home";
import Hello from "./hello";

const Root = ({ store }) => {
  return <Provider store={ store }>
    <Router history={hashHistory}>
      <Route path="/" component={ App } >
        <IndexRoute component={ Hello } />
        <Route path="/home" component={ Home } />
      </Route>
    </Router>
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
