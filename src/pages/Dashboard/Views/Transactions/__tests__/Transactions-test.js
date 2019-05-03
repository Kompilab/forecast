import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Transactions from '../Transactions';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <Transactions />
    </Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
