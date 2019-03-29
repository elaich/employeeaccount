import { List, AccountRow } from '.'
import { shallow } from 'enzyme'
import * as React from 'react'
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import { accounts } from '../../fixtures';

it ('List renders a material ui table', () => {
  const wrapper = shallow(<List accounts={accounts} />);
  expect(wrapper.find(Table).length).toEqual(1);
  expect(wrapper.find(TableHead).find(TableRow).length).toEqual(1);
  expect(wrapper.find(TableBody).find(AccountRow).length).toEqual(2);
})

it ('Account Rows have the accounts props', () => {
  const wrapper = shallow(<List accounts={accounts} />);
  expect(wrapper.find(AccountRow).first().props().account).toEqual(accounts[0])
})
