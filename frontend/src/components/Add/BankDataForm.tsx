import * as React from 'react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {WithStyles} from '@material-ui/core';
import {graphqlClient} from '../../graphql/client';

const styles = (theme: any): any => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  formControl: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
});

interface PropsI {
  classes: any;
  handleChange(
    name: string,
  ): (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  bank: string;
  branch: string;
}

interface BanksI {
  name: string;
  branches: string[];
}

interface StateI {
  banks: BanksI[];
}

class TextFields extends React.Component<PropsI, StateI> {
  public state: StateI = {
    banks: [],
  };

  componentDidMount() {
    graphqlClient.banks().then(data => this.setState({banks: data}));
  }

  render() {
    const {classes} = this.props;
    const {handleChange, bank, branch} = this.props;
    const {banks} = this.state;
    const choosenBank = banks.find(b => b.name === bank)
    let branches: string[] = []
    if (choosenBank) {
      branches = choosenBank.branches;
    }

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">Bank Name</InputLabel>
          <Select value={bank} onChange={handleChange('bank')}>
            {banks.map(bank => (
              <MenuItem value={bank.name}>{bank.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">Bank Name</InputLabel>
          <Select value={branch} onChange={handleChange('branch')}>
            {branches.map(b => (
              <MenuItem value={b}>{b}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    );
  }
}

const BankDataForm = withStyles(styles)(TextFields);

export {BankDataForm};
