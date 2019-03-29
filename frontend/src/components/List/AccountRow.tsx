import * as React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Checkbox,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import {Account} from '../../model/Account';
import {AccountView} from '../../model/AccountView';
import {columns} from '.';

interface AccountRowProps {
  account: Account;
  onSelect(id: string): void;
  key: string;
  checked: boolean;
  open(account?: Account): void;
}

const mapAccount = (account: Account): AccountView => ({
  ...account,
  account_number: account.account_number.padStart(15, '0'),
  employee_number: account.employee_number.padStart(7, '0'),
  last_update: account.last_update.toString(),
});

export const AccountRow = (props: AccountRowProps) => {
  const {account, onSelect, checked, open} = props;
  const mappedAccount = mapAccount(account);
  return (
    <TableRow onClick={() => onSelect(account._id)}>
      <TableCell padding="checkbox">
        <Checkbox checked={checked} />
      </TableCell>
      {columns.map(column => (
        <TableCell key={column.prop} align={column.numeric ? 'right' : 'left'}>
          {mappedAccount[column.prop]}
        </TableCell>
      ))}
      <TableCell align="center">
        <IconButton aria-label="Delete" onClick={() => open(account)}>
          <EditIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
