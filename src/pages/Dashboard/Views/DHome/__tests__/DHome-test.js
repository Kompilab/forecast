import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import DHome from '../DHome';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <DHome />
    </Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
