import {AccountActions} from './AccountActions';
import {
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  UPDATE_ACCOUNTS,
  UPDATE_ACCOUNT,
  SORT_ACCOUNTS,
} from './AccountActionsTypes';

import {AccountReducer} from './AccountReducer';
import {store} from './store';

const accounts = [
  {
    _id: '1',
    holder: 'Hamid',
    name: 'Rachid',
    bank: 'BMCE',
    branch: 'ATTIJARI',
    account_type: 'Checking',
    account_number: '989432983434',
    employee_number: '342',
    last_update: new Date(),
  },
  {
    _id: '2',
    holder: 'Hamid',
    name: 'Yassine',
    bank: 'BMCE',
    branch: 'ATTIJARI',
    account_type: 'Checking',
    account_number: '989432983434',
    employee_number: '32',
    last_update: new Date(),
  },
];

const graphQLClientMock = {
  all: jest.fn().mockReturnValue([accounts[0]]),
  update: jest.fn().mockReturnValue(accounts[1]),
  remove: jest.fn().mockReturnValue(accounts[1]),
  create: jest.fn().mockReturnValue(accounts[1]),
  search: jest.fn().mockReturnValue(accounts),
};

describe('AccountReducer', () => {
  it('Listens to Remove Account Action', () => {
    const result = AccountReducer(accounts, {type: DELETE_ACCOUNT, data: '2'});
    expect(result.length).toEqual(1);
    expect(result[0].name).toEqual('Rachid');
  });

  it('Listens to Update Accounts Action', () => {
    const result = AccountReducer([], {type: UPDATE_ACCOUNTS, data: accounts});
    expect(result.length).toEqual(2);
    expect(result).toEqual(accounts);
  });

  it('Listens to Update Account Action', () => {
    const result = AccountReducer([accounts[0]], {
      type: UPDATE_ACCOUNT,
      data: {account: accounts[1], id: '1'},
    });
    expect(result.length).toEqual(1);
    expect(result[0]).toEqual(accounts[1]);
  });

  it('Listens to Sort Accounts Action by name', () => {
    const result = AccountReducer(accounts, {
      type: SORT_ACCOUNTS,
      data: {
        order: 'desc',
        orderby: 'name',
      },
    });
    expect(result[0]).toEqual(accounts[1]);
  });

  it('Listens to Sort Accounts Action by employee number', () => {
    const result = AccountReducer(accounts, {
      type: SORT_ACCOUNTS,
      data: {
        order: 'asc',
        orderby: 'employee_number',
      }
    });
    expect(result[0]).toEqual(accounts[1]);
  });
});

describe('Store', () => {
  it('Has the initial state', () => {
    const initialState = store.getState();
    expect(initialState.length).toBe(0);
  });

  it('Updates when we fetch all the accounts', async () => {
    const accountActions: AccountActionsI = AccountActions(graphQLClientMock);
    await store.dispatch(accountActions.fetchAll());
    const state = store.getState();
    expect(state.length).toBe(1);
  });

  it('Updates when we update an account', async () => {
    const accountActions: AccountActionsI = AccountActions(graphQLClientMock);
    await store.dispatch(accountActions.update(accounts[1], '1'));
    const state = store.getState();

    // Called graphQLClient Mock
    expect(graphQLClientMock.update.mock.calls[0][0]).toBe('1');
    expect(graphQLClientMock.update.mock.calls[0][1]).toEqual(accounts[1]);

    expect(state.length).toBe(1);
    expect(state[0]).toEqual(accounts[1]);
  });

  it('Updates when we remove an account', async () => {
    const accountActions: AccountActionsI = AccountActions(graphQLClientMock);
    await store.dispatch(accountActions.remove('2'));
    const state = store.getState();

    // Called graphQLClient Mock
    expect(graphQLClientMock.remove.mock.calls[0][0]).toBe('2');

    expect(state.length).toBe(0);
  });

  it('Updates when we add an account', async () => {
    const accountActions: AccountActionsI = AccountActions(graphQLClientMock);
    await store.dispatch(accountActions.create(accounts[1]));
    const state = store.getState();

    // Called graphQLClient Mock
    expect(graphQLClientMock.create.mock.calls[0][0]).toEqual(accounts[1]);

    expect(state.length).toBe(1);
    expect(state[0]).toEqual(accounts[1]);
  });

  it('Updates when we search accounts', async () => {
    const accountActions: AccountActionsI = AccountActions(graphQLClientMock);
    await store.dispatch(accountActions.search(10, 1000));
    const state = store.getState();

    // Called graphQLClient Mock
    expect(graphQLClientMock.search.mock.calls[0][0]).toEqual(10);
    expect(graphQLClientMock.search.mock.calls[0][1]).toEqual(1000);

    expect(state.length).toBe(2);
  });
});
