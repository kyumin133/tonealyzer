import {combineReducers} from 'redux';
import testReducer from './test_reducer';
import blurbsReducer from './blurbs_reducer';

const rootReducer = combineReducers({
  test: testReducer,
  blurbs: blurbsReducer
});

export default rootReducer;
