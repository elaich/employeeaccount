import * as React from 'react';
import {connect} from 'react-redux';
import {graphqlClient} from '../../graphql/client';
import {AccountActions} from '../../flux/AccountActions';
import {State} from '../../flux/AccountReducer';
import {Account} from '../../model/Account';
import {AccountCreateInput} from '../../model/AccountCreateInput';
import {AddAccount} from '.';

interface PropsI {
  create(account: Account): Promise<Account>;
  close(): void;
}

class Container extends React.Component<PropsI> {
  state = {
    holder: '',
    name: '',
    bank: '',
    branch: '',
    account_type: '',
    account_number: '',
    employee_number: '',
  };

  handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    this.setState({[name]: event.target.value});
  };

  render() {
    const {...data} = this.state;
    const {create, close} = this.props;
    return (
      <AddAccount
        create={create}
        close={close}
        handleChange={this.handleChange}
        data={data}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  const accountActions = AccountActions(graphqlClient);
  return {
    create: (account: Account) => dispatch(accountActions.create(account)),
  };
};

export default connect(null, mapDispatchToProps)(Container);
