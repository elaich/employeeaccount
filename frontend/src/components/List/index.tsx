import * as React from 'react';

import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import {Account} from '../../model/Account';
import {TableToolbar} from './TableToolbar';

interface ListProps {
  accounts: Array<Account>;
  onSelect(id: string): void;
  isSelected(id: string): boolean;
  deleteSelected(): void;
  open(account?: Account): void;
}

export const List = (props: ListProps) => {
  const {accounts, onSelect, isSelected, deleteSelected, open} = props;
  return (
    <Paper>
      <TableToolbar deleteSelected={deleteSelected} />
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
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map(account => {
            const checked = isSelected(account._id);
            return (
              <AccountRow
                account={account}
                key={account._id}
                onSelect={onSelect}
                checked={checked}
                open={open}
              />
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

interface AccountRowProps {
  account: Account;
  onSelect(id: string): void;
  key: string;
  checked: boolean;
  open(account?: Account): void;
}

export const AccountRow = ({account, onSelect, checked, open}: AccountRowProps) => (
  <TableRow onClick={() => onSelect(account._id)}>
    <TableCell padding="checkbox">
      <Checkbox checked={checked} />
    </TableCell>
    <TableCell>{account.holder}</TableCell>
    <TableCell align="right">{account.name}</TableCell>
    <TableCell align="right">{account.bank}</TableCell>
    <TableCell align="right">{account.branch}</TableCell>
    <TableCell align="right">{account.account_type}</TableCell>
    <TableCell align="right">{account.account_number}</TableCell>
    <TableCell align="right">{account.employee_number}</TableCell>
    <TableCell align="right">{account.last_update.toString()}</TableCell>
    <TableCell align="center">
      <IconButton aria-label="Delete" onClick={() => open(account)}>
        <EditIcon />
      </IconButton>
    </TableCell>
  </TableRow>
);
