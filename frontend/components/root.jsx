import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from "./app";
import Splash from "./splash";
import DashboardContainer from "./dashboard/dashboard_container";
import ResultsContainer from "./results/results_container";

const Root = ({ store }) => {
  return <Provider store={ store }>
    <Router history={hashHistory}>
      <Route path="/" component={ App } >
        <IndexRoute component={ Splash } />
        <Route path="/home" component={ DashboardContainer } />
        <Route path="/results/:blurbId" component={ ResultsContainer } />
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
