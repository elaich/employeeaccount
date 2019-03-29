import * as React from 'react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {WithStyles} from '@material-ui/core';

const styles = (theme: any): any => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
  },
});

interface PropsI {
  handleChange(
    name: string,
  ): (event: React.ChangeEvent<HTMLSelectElement>) => void;
  classes: any;
  name: string;
  employee_number: string;
}

class TextFields extends React.Component<any> {
  render() {
    const {classes} = this.props;
    const {data} = this.props;

    return (
      <div className={classes.container} >
        <div className={classes.paper}>
          <p>Bank Name: {data.bank}</p>
          <p>Bank Branch: {data.branch}</p>
          <p>Account holders'name: {data.holder}</p>
          <p>Account Type: {data.account_type}</p>
          <p>Account Number: {data.account_number}</p>
          <p>Employee Name: {data.name}</p>
          <p>Employee Number: {data.employee_number}</p>
        </div>
      </div>
    );
  }
}

const Confirmation = withStyles(styles)(TextFields);

export { Confirmation }
