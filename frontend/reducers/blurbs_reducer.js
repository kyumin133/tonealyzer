import {
  RECIEVE_BLURB,
  RECIEVE_BLURBS,
} from '../actions/blurb_actions';
import merge from 'lodash/merge';

const blurbsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECIEVE_BLURBS:
      return merge({}, action.blurbs);
    case RECIEVE_BLURB:
      return merge({}, state, {[action.blurb.id]: action.blurb});
    default:
      return state;
  }
};

export default blurbsReducer;
