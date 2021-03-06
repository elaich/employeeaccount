import {
  ADD_ACCOUNT,
  SORT_ACCOUNTS,
  DELETE_ACCOUNT,
  UPDATE_ACCOUNTS,
  UPDATE_ACCOUNT,
} from './AccountActionsTypes';
import {Account} from '../model/Account';
import {ActionI} from './AccountActions';

export type State = Array<Account>;

const desc = (a: Account, b: Account, orderBy: string) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

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
    case SORT_ACCOUNTS:
      const copy = [...state];
      return copy.sort((a, b) => {
        return action.data.order === 'desc'
          ? desc(a, b, action.data.orderby)
          : -desc(a, b, action.data.orderby);
      });

    default:
      return state;
  }
};
