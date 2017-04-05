import {
RECEIVE_PERSONALITY
} from '../actions/personality_actions';
import merge from 'lodash/merge';

const personalityReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_PERSONALITY:
      return merge({}, action.personality);
    default:
      return state;
  }
};

export default personalityReducer;
