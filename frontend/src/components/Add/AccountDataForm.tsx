import * as React from 'react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {WithStyles} from '@material-ui/core';

const styles = (theme: any): any => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  formControl: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
    minWidth: 200,
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
  holder: string;
  account_type: string;
  account_number: string;
}

class TextFields extends React.Component<PropsI> {
  render() {
    const {classes} = this.props;
    const {handleChange, holder, account_type, account_number} = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-name"
          label="Accounts holder's name"
          value={holder}
          onChange={handleChange('holder')}
          className={classes.textField}
          margin="normal"
        />

        <TextField
          id="standard-uncontrolled"
          label="Account number"
          className={classes.textField}
          value={account_number}
          onChange={handleChange('account_number')}
          margin="normal"
        />

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">Account Type</InputLabel>
          <Select value={account_type} onChange={handleChange('account_type')}>
            <MenuItem value="Checking">Checking</MenuItem>
            <MenuItem value="Savings">Savings</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

const AccountDataForm = withStyles(styles)(TextFields);

export {AccountDataForm};
