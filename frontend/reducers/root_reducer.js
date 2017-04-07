import {combineReducers} from 'redux';
import testReducer from './test_reducer';
import blurbsReducer from './blurbs_reducer';
import personalityReducer from './personality_reducer';
import sessionReducer from './session_reducer';
import { reducer } from 'react-redux-oauth2';

const rootReducer = combineReducers({
  session: sessionReducer,
  test: testReducer,
  blurbs: blurbsReducer,
  personality: personalityReducer,
  reducer
});

export default rootReducer;
