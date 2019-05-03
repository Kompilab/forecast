import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ConfirmEmail from '../ConfirmEmail';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <ConfirmEmail location={{state: {from: {}}}}/>
    </Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
