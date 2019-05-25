import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import BankStatements from '../BankStatements';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <BankStatements />
    </Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
