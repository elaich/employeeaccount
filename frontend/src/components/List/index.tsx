import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';

import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
} from '@material-ui/core';

import {lighten} from '@material-ui/core/styles/colorManipulator';

import {Account} from '../../model/Account';
import { TableToolbar } from './TableToolbar'

export const List = ({accounts}: {accounts: Array<Account>}) => {
  return (
    <Paper>
    <TableToolbar numSelected={2} />
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Account Holder's name</TableCell>
          <TableCell align="right">Employee name</TableCell>
          <TableCell align="right">Bank name</TableCell>
          <TableCell align="right">Branch name</TableCell>
          <TableCell align="right">Account type</TableCell>
          <TableCell align="right">Account number</TableCell>
          <TableCell align="right">Employee number</TableCell>
          <TableCell align="right">Last Update</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {accounts.map(account => (
          <AccountRow account={account} key={account._id} />
        ))}
      </TableBody>
    </Table>
    </Paper>
  );
};

export const AccountRow = ({account}: {account: Account}) => (
  <TableRow>
    <TableCell padding="checkbox">
      <Checkbox />
    </TableCell>
    <TableCell>{account.holder}</TableCell>
    <TableCell align="right">{account.name}</TableCell>
    <TableCell align="right">{account.bank}</TableCell>
    <TableCell align="right">{account.branch}</TableCell>
    <TableCell align="right">{account.account_type}</TableCell>
    <TableCell align="right">{account.account_number}</TableCell>
    <TableCell align="right">{account.employee_number}</TableCell>
    <TableCell align="right">{account.last_update.toString()}</TableCell>
  </TableRow>
);

