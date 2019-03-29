import * as React from 'react';
import {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ListContainer from './components/List/Container';
import AddAccountContainer from './components/Add/Container';
import AddButton from './components/Add/AddButton';
import {accounts} from './fixtures';
import {Provider} from 'react-redux';
import {store} from './flux/store';
import Modal from '@material-ui/core/Modal';

class App extends Component {
  state = {
    create_modal_open: false,
    edit_modal_open: false,
  };

  toggleCreateModal = () => {
    this.setState({create_modal_open: !this.state.create_modal_open});
  };

  toggleEditModal = () => {
    this.setState({edit_modal_open: !this.state.edit_modal_open});
  };

  render() {
    return (
      <Provider store={store}>
        <ListContainer />
        <Modal open={this.state.create_modal_open}>
          <AddAccountContainer close={this.toggleCreateModal} />
        </Modal>
        <AddButton onClick={this.toggleCreateModal} />
      </Provider>
    );
  }
}

export default App;
