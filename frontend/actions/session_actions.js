import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const requestLogin = user => dispatch => (
  APIUtil.login(user).then(
    currentUser => dispatch(receiveCurrentUser(currentUser))
  )
);

export const requestLogout = () => dispatch => (
  APIUtil.logout().then(
    user => dispatch(receiveCurrentUser(null))
  )
);

export const requestDemoUser = () => dispatch => (
  APIUtil.loginDemoUser().then(
    currentUser => dispatch(receiveCurrentUser(currentUser))
  )
);
