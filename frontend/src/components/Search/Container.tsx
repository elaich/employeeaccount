import * as React from 'react';
import {connect} from 'react-redux';
import {SearchForm} from '.';
import {graphqlClient} from '../../graphql/client';
import {AccountActions} from '../../flux/AccountActions';

interface StateI {
  from: string;
  to: string;
  [key: string]: string;
}

interface PropsI {
  search(from?: number, to?: number): void;
}

class Container extends React.Component<PropsI, StateI> {
  state = {
    from: '',
    to: '',
  };

  handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    this.setState({[name]: event.target.value});
  };

  search = () => {
    const { from, to } = this.state;
    let _from, _to;
    if ( from !== '' && Number(from)) {
      _from = Number(from)
    }
    if ( to !== '' && Number(to)) {
      _to = Number(to)
    }
    this.props.search(_from, _to);
  };

  render() {
    return (
      <SearchForm
        handleChange={this.handleChange}
        search={this.search}
        data={this.state}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  const accountActions = AccountActions(graphqlClient);
  return {
    search: (from?: number, to?: number) =>
      dispatch(accountActions.search(from, to)),
  };
};

export default connect(null, mapDispatchToProps)(Container);
