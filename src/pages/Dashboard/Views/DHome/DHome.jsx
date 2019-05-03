import React, { Component } from 'react';
import './DHome.scss';
import userAuth from '../../../../services/authenticate';
// import Icon from 'react-web-vector-icons';

class DHome extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div>
        <h4>Welcome, { userAuth.authName }</h4>
        <p>The journey of a thousand miles starts with a click...</p>
      </div>
    )
  }
}

export default DHome;
