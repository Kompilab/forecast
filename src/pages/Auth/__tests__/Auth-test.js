import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth from '../Auth';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <Auth match={{params: {}}} />
    </Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
