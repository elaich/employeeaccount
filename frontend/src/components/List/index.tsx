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
  Tooltip,
  TableSortLabel,
} from '@material-ui/core';
import {Account} from '../../model/Account';
import {TableToolbar} from './TableToolbar';
import { AccountRow } from './AccountRow';

interface ListProps {
  accounts: Array<Account>;
  onSelect(id: string): void;
  isSelected(id: string): boolean;
  deleteSelected(): void;
  open(account?: Account): void;
  sort(orderby: string, order: string): void;
}

export const columns = [
  {prop: 'holder', label: "Account Holder's name"},
  {prop: 'name', label: 'Employee name'},
  {prop: 'bank', label: 'Bank name'},
  {prop: 'branch', label: 'Branch name'},
  {prop: 'account_type', label: 'Account type'},
  {prop: 'account_number', label: 'Account number', numeric: true},
  {prop: 'employee_number', label: 'Employee number', numeric: true},
  {prop: 'last_update', label: 'Last Update'},
];

export class List extends React.Component<ListProps> {
  state = {
    orderby: '',
    order: '',
  };

  sort = (property: string) => () => {
    const orderby = property;
    let order = 'desc';

    if (this.state.orderby === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.props.sort(orderby, order);
    this.setState({ order, orderby });
  };

  render() {
    const {accounts, onSelect, isSelected, deleteSelected, open} = this.props;
    const {order, orderby} = this.state;
    return (
      <Paper>
        <TableToolbar deleteSelected={deleteSelected} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              {columns.map(column => (
                <TableCell align={column.numeric ? 'right': 'left'} sortDirection="asc">
                  <Tooltip
                    title="Sort"
                    placement={'bottom-start'}
                    enterDelay={300}>
                    <TableSortLabel
                      direction={order === 'desc'? 'desc' : 'asc'}
                      active={orderby === column.prop}
                      onClick={this.sort(column.prop)}>
                      {column.label}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              ))}
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
  }
}
