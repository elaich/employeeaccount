import * as React from 'react';
import {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ListContainer from './components/List/Container';
import {accounts} from './fixtures';
import {Provider} from 'react-redux';
import {store} from './flux/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ListContainer />
      </Provider>
    );
  }
}

export default App;
