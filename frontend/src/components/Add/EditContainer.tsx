import * as React from 'react';
import {connect} from 'react-redux';
import {graphqlClient} from '../../graphql/client';
import {AccountActions} from '../../flux/AccountActions';
import {State} from '../../flux/AccountReducer';
import {Account} from '../../model/Account';
import {AccountCreateInput} from '../../model/AccountCreateInput';
import {AddAccount} from '.';

interface PropsI {
  create(account: Account, id?: string): Promise<Account>;
  close(): void;
  account?: Account;
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

  componentDidMount() {
    const { account } = this.props
    if (account) {
      const {_id, last_update, ...rest} = account
      this.setState(rest);
    }
  }

  handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    this.setState({[name]: event.target.value});
  };

  render() {
    const {...data} = this.state;
    const {create, close, account} = this.props;
    return (
      <AddAccount
        create={create}
        close={close}
        handleChange={this.handleChange}
        data={data}
        account={account}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  const accountActions = AccountActions(graphqlClient);
  return {
    create: (account: Account, id: string) =>
      dispatch(accountActions.update(account, id)),
  };
};

export default connect(null, mapDispatchToProps)(Container);
