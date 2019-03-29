import * as React from 'react'
import { connect } from 'react-redux'
import { graphqlClient } from '../../graphql/client';
import { AccountActions } from '../../flux/AccountActions';
import { State } from '../../flux/AccountReducer';
import { Account } from '../../model/Account'
import { List } from '.'

interface ContainerProps {
  fetchAll(): Promise<Array<Account>>;
  accounts: Array<Account>;
}

class Container extends React.Component<ContainerProps> {
  componentDidMount() {
    this.props.fetchAll();
  }

  render() {
    return <List accounts={this.props.accounts} />
  }
}

const mapDispatchToProps = (dispatch: any) => {
  const accountActions = AccountActions(graphqlClient);
  return {
    fetchAll: () => dispatch(accountActions.fetchAll())
  }
}

const mapStateToProps = (state: State) => {
  return {
    accounts: state
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)
