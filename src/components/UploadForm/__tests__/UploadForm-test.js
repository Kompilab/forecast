import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import UploadForm from '../UploadForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <UploadForm />
    </Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
