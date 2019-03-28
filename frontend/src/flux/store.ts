import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {AccountReducer} from './AccountReducer';

export const store = createStore(
  AccountReducer,
  applyMiddleware(thunkMiddleware),
);
