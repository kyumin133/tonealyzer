import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS } from '../actions/session_actions';
import merge from 'lodash/merge';
import { hashHistory } from 'react-router';

const _nullUser = {currentUser: null, errors: []};

const sessionReducer = (state = _nullUser, action) => {
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_CURRENT_USER:
      // debugger
      const currentUser = action.currentUser;
      return merge({}, state, { currentUser });
    case RECEIVE_ERRORS:
      debugger;
      // hashHistory.push('/');
      const errors = action.errors;
      return merge({}, state, { errors });
    default:
      return state;
  }
};

export default sessionReducer;
