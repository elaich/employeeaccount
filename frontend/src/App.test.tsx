// test file
// j
import { shallow, mount, render } from 'enzyme';
import App from './App'
import * as React from 'react'
import './setupTests'

it ('shallow render', () => {
  const wrapper = shallow(<App />);
})
