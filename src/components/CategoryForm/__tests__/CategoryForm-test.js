import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import TransactionForm from '../TransactionForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <TransactionForm />
    </Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
