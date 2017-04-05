import {combineReducers} from 'redux';
import testReducer from './test_reducer';
import blurbsReducer from './blurbs_reducer';
import personalityReducer from './personality_reducer';

const rootReducer = combineReducers({
  test: testReducer,
  blurbs: blurbsReducer,
  personality: personalityReducer
});

export default rootReducer;
