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
  classes: any
  handleChange(name: string): (event: React.ChangeEvent<HTMLInputElement>) => void
  bank: string
  branch: string
}

class TextFields extends React.Component<PropsI> {
  render() {
    const {classes} = this.props;
    const {handleChange, bank, branch} = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-name"
          label="Bank Name"
          value={bank}
          onChange={handleChange('bank')}
          className={classes.textField}
          margin="normal"
        />

        <TextField
          id="standard-uncontrolled"
          label="Bank Branch"
          value={branch}
          onChange={handleChange('branch')}
          className={classes.textField}
          margin="normal"
        />
      </form>
    );
  }
}

const BankDataForm = withStyles(styles)(TextFields);

export { BankDataForm }
