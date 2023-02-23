// src/reducers/index.js

import { combineReducers } from 'redux';
import counterReducer from './counterreducer.js';

const rootReducer = combineReducers({
  counter: counterReducer
});

export default rootReducer;
