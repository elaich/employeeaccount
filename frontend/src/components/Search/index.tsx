import * as React from 'react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {WithStyles} from '@material-ui/core';

const styles = (theme: any): any => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
});

interface FormDataI {
  from: string;
  to: string;
}

interface PropsI {
  classes: any;
  data: FormDataI;
  search(): void;
  handleChange(
    name: string,
  ): (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

class TextFields extends React.Component<PropsI> {
  render() {
    const {data, handleChange, search, classes} = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-name"
          value={data.from}
          onChange={handleChange('from')}
          label="Employee Number From"
          className={classes.textField}
          margin="normal"
        />

        <TextField
          id="standard-uncontrolled"
          label="Employee Number To"
          value={data.to}
          onChange={handleChange('to')}
          className={classes.textField}
          margin="normal"
        />

        <Button variant="contained" onClick={search} className={classes.button}>
          Search
        </Button>
      </form>
    );
  }
}

const SearchForm = withStyles(styles)(TextFields);

export {SearchForm};
