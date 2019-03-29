import {GraphQLClient} from 'graphql-request';
import { AccountEditInput } from '../model/AccountEditInput'
import { Account } from '../model/Account'

const client = new GraphQLClient('/graphql');

const graphqlClient = {
  all: async () => {
    const query = `
      query All {
        all {
          _id
          holder
          name
          bank
          branch
          account_type
          account_number
          employee_number
          last_update
        }
      }
    `;

    const {all} = await client.request(query);
    return all;
  },

  update: async (id: string, account: AccountEditInput): Promise<Account> => {
    const query = `
      mutation Edit($id: ID!, $account: AccountEditInput!) {
        edit(id: $id, account: $account) {
          _id
          holder
          name
          bank
          last_update
        }
      }
    `;

    const { edit } = await client.request(query, {id, account})
    return edit
  },

  remove: async (id: string) :Promise<Account> => {
    const query = `
      mutation Remove($id: ID!) {
        remove(id: $id) {
          _id
        }
      }
    `;

    const { remove } = await client.request(query, {id});
    return remove
  },

  create: async (account: Account): Promise<Account> => {
    const query = `
      mutation Add($account: AccountCreateInput!) {
        add(account: $account) {
           _id
          holder
          name
          bank
          branch
          account_type
          account_number
          employee_number
          last_update
        }
      }
    `;

    const {add} = await client.request(query, {account});
    return add
  },
};

export {graphqlClient};
