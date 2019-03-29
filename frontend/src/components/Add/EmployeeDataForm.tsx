import * as React from 'react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {WithStyles} from '@material-ui/core';

const styles = (theme: any): any => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
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
    const {name, employee_number, handleChange} = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-name"
          label="Employee name"
          value={name}
          onChange={handleChange('name')}
          className={classes.textField}
          margin="normal"
        />

        <TextField
          id="standard-uncontrolled"
          label="Employee number"
          value={employee_number}
          onChange={handleChange('employee_number')}
          className={classes.textField}
          margin="normal"
        />
      </form>
    );
  }
}

const EmployeeDataForm = withStyles(styles)(TextFields);

export { EmployeeDataForm }
