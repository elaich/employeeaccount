import {ADD_ACCOUNT, DELETE_ACCOUNT, UPDATE_ACCOUNTS, UPDATE_ACCOUNT} from './AccountActionsTypes';
import { Account } from '../model/Account'
import { ActionI } from './AccountActions'

export type State = Array<Account>
export const AccountReducer = (state: State = [], action: ActionI) => {
  switch (action.type) {
    case ADD_ACCOUNT:
      return [...state, action.data];
      break;
    case DELETE_ACCOUNT:
      return state.filter(account => account._id !== action.data);
      break;
    case UPDATE_ACCOUNTS:
      return action.data;
      break;
    case UPDATE_ACCOUNT:
      return state.map(
        account =>
          account._id === action.data.id ? action.data.account : account,
      );
      break;

    default:
      return state;
  }
};
