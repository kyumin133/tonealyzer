import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from "./app";
import Home from "./home";
import DashboardContainer from "./dashboard/dashboard_container";
import BlurbInputContainer from "./blurb_input/blurb_input_container";

const Root = ({ store }) => {
  return <Provider store={ store }>
    <Router history={hashHistory}>
      <Route path="/" component={ App } >
        <IndexRoute component={ DashboardContainer } />
        <Route path="/home" component={ Home } />
        <Route path="/newBlurb" component={ BlurbInputContainer } />
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
