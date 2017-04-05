import {combineReducers} from 'redux';
import testReducer from './test_reducer';
import blurbsReducer from './blurbs_reducer';
import personalityReducer from './personality_reducer';
import sessionReducer from './session_reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  test: testReducer,
  blurbs: blurbsReducer,
  personality: personalityReducer
});

export default rootReducer;
