import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from "./app";
import Splash from "./splash";
import DashboardContainer from "./dashboard/dashboard_container";
<<<<<<< HEAD
import BlurbInputContainer from "./blurb_input/blurb_input_container";
=======
>>>>>>> 20c605770ff2c73e4035b242daca6b385a03dc36
import ResultsContainer from "./results/results_container";

const Root = ({ store }) => {
  return <Provider store={ store }>
    <Router history={hashHistory}>
      <Route path="/" component={ App } >
        <IndexRoute component={ Splash } />
        <Route path="/home" component={ DashboardContainer } />
<<<<<<< HEAD
        <Route path="/newBlurb" component={ BlurbInputContainer } />
=======
>>>>>>> 20c605770ff2c73e4035b242daca6b385a03dc36
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
