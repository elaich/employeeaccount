import * as React from 'react';
import {SearchForm} from '.';

interface StateI {
  from: string;
  to: string;
  [key: string]: string;
}

class Container extends React.Component<any, StateI> {
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
    console.log('Searching', this.state);
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

export default Container;
