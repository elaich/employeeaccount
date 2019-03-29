import * as React from 'react';
import {connect} from 'react-redux';
import {graphqlClient} from '../../graphql/client';
import {AccountActions} from '../../flux/AccountActions';
import {State} from '../../flux/AccountReducer';
import {Account} from '../../model/Account';
import {List} from '.';

interface ContainerProps {
  fetchAll(): Promise<Array<Account>>;
  remove(id: string): Promise<Account>;
  accounts: Array<Account>;
  open(account: Account): void;
}

interface ContainerState {
  selected: Array<string>;
}

class Container extends React.Component<ContainerProps, ContainerState> {
  constructor(props: ContainerProps) {
    super(props);
    this.state = {selected: []};
  }

  componentDidMount() {
    this.props.fetchAll();
  }

  render() {
    return (
      <List
        accounts={this.props.accounts}
        onSelect={this.handleClick}
        isSelected={this.isSelected}
        deleteSelected={this.deleteSelected}
        open={this.props.open}
      />
    );
  }

  deleteSelected = () => {
    this.state.selected.forEach(s => this.props.remove(s));
  };

  handleClick = (id: string) => {
    const {selected} = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected: Array<string> = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({selected: newSelected});
  };

  isSelected = (id: string) => this.state.selected.indexOf(id) !== -1;
}

const mapDispatchToProps = (dispatch: any) => {
  const accountActions = AccountActions(graphqlClient);
  return {
    fetchAll: () => dispatch(accountActions.fetchAll()),
    remove: (id: string) => dispatch(accountActions.remove(id)),
  };
};

const mapStateToProps = (state: State) => {
  return {
    accounts: state,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
