import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from "./app";
import Home from "./home";

const Root = ({ store }) => {
  return <Provider store={ store }>
    <Router history={ hashHistory }>
      <Route path="/" component={ App } >
        <IndexRoute component={ Home } loggedIn={ !!window.currentUser }  />
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
