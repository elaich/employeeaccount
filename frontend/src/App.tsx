import * as React from 'react';
import {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ListContainer from './components/List/Container';
import AddAccountContainer from './components/Add/Container';
import EditAccountContainer from './components/Add/EditContainer';
import SearchContainer from './components/Search/Container';
import AddButton from './components/Add/AddButton';
import {accounts} from './fixtures';
import {Provider} from 'react-redux';
import {store} from './flux/store';
import Modal from '@material-ui/core/Modal';
import { Account } from './model/Account';

class App extends Component {
  state = {
    create_modal_open: false,
    edit_modal_open: false,
    edit_account: undefined,
  };

  toggleCreateModal = () => {
    this.setState({create_modal_open: !this.state.create_modal_open});
  };

  openEditModal = (account: Account) => {
    this.setState({
      edit_modal_open: true,
      edit_account: account,
    });
  };

  closeEditModal = () => {
    this.setState({
      edit_modal_open: false
    })
  }

  render() {
    return (
      <Provider store={store}>
        <SearchContainer />
        <ListContainer open={this.openEditModal} />
        <Modal open={this.state.create_modal_open}>
          <AddAccountContainer close={this.toggleCreateModal} />
        </Modal>
        <Modal open={this.state.edit_modal_open}>
          <EditAccountContainer
            close={this.closeEditModal}
            account={this.state.edit_account}
          />
        </Modal>
        <AddButton onClick={this.toggleCreateModal} />
      </Provider>
    );
  }
}

export default App;
