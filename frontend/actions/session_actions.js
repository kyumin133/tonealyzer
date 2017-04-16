import * as APIUtil from '../util/session_api_util';
import { hashHistory } from 'react-router';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const receiveCurrentUser = currentUser => {
  return({
  type: RECEIVE_CURRENT_USER,
  currentUser
})};

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const requestDemoUser = () => dispatch => (
  APIUtil.loginDemoUser()
  .then((currentUser) => {
    return dispatch(receiveCurrentUser(currentUser));
  }).then(() => hashHistory.push('/home'))
);

export const requestLogin = user => dispatch => (
  APIUtil.login(user)
  .then(currentUser => {
    return dispatch(receiveCurrentUser(currentUser))})
  .then(() => hashHistory.push('/home'))
  .fail( error => dispatch(receiveErrors(error.responseJSON)))
);

export const requestSignup = user => dispatch => {
  return(
  APIUtil.signup(user)
  .then(currentUser => {
    return dispatch(receiveCurrentUser(currentUser))})
  .then(() => hashHistory.push('/home'))
  .fail( error => dispatch(receiveErrors(error.responseJSON)))
)};

export const requestLogout = () => dispatch => (
  APIUtil.logout()
  .then(() => dispatch(receiveCurrentUser(null)))
  .then(() => {
    hashHistory.push('/logout');
  })
);
