import {
  RECEIVE_BLURB,
  RECEIVE_BLURBS,
} from '../actions/blurb_actions';
import merge from 'lodash/merge';

const blurbsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_BLURBS:
      console.log(action.blurbs);
      return merge({}, action.blurbs);
    case RECEIVE_BLURB:
      return merge({}, state, {[action.blurb.id]: action.blurb});
    default:
      return state;
  }
};

export default blurbsReducer;
