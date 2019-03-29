import {
  UPDATE_ACCOUNTS,
  UPDATE_ACCOUNT,
  DELETE_ACCOUNT,
  ADD_ACCOUNT,
} from './AccountActionsTypes';

import { Account } from '../model/Account'
import { AccountEditInput } from '../model/AccountEditInput'
import { AccountCreateInput } from '../model/AccountCreateInput'

export interface AccountGraphQLClientI {
  all(): Promise<Array<Account>>;
  update(id: string, account: AccountEditInput): Promise<Account>;
  remove(id: string): Promise<Account>;
  create(account: AccountCreateInput): Promise<Account>;
}

export interface ActionI {
  type: string;
  data: any;
}

export const AccountActions = (
  graphQLClient: AccountGraphQLClientI,
) => {

  // Actions Creators
  const updateAccounts = (accounts: Array<Account>) => ({type: UPDATE_ACCOUNTS, data: accounts});

  const updateAccount = (id: string, account: Account) => ({
    type: UPDATE_ACCOUNT,
    data: {id, account},
  });

  const deleteAccount = (id: string) => ({type: DELETE_ACCOUNT, data: id});

  const addAccount = (account: Account) => ({type: ADD_ACCOUNT, data: account});

  // Async Actions
  const fetchAll = () => async (dispatch: any) => {
    const accounts = await graphQLClient.all();
    dispatch(updateAccounts(accounts));
  };

  const update = (account: Account, id: string) => async (dispatch: any) => {
    const updated = await graphQLClient.update(id, account);
    dispatch(updateAccount(id, updated));
  };

  const remove = (id: string) => async (dispatch: any) => {
    const removed = await graphQLClient.remove(id);
    dispatch(deleteAccount(id));
  };

  const create = (account: Account) => async (dispatch: any) => {
    const added = await graphQLClient.create(account);
    dispatch({type: ADD_ACCOUNT, data: added});
  };

  return {
    fetchAll,
    update,
    remove,
    create,
  };
};
