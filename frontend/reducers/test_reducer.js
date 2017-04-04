import merge from 'lodash/merge';

const initialState = {};

const testReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch (action.type) {
    default:
      return newState;
  }
};



export default testReducer;
