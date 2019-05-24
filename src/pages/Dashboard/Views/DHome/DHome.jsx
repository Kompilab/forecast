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
      <section className="dashboard-content">
        <div>
          <h4>Welcome, { userAuth.authName }</h4>
          {/* <p>The journey of a thousand miles starts with a click...</p> */}
          <p>You're one step closer to understanding your spending habit and making better financial decisions.</p>
        </div>

        <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3 d-card">
            <h6>Import Bank Statement</h6>
            <button className="btn btn-light btn-sm">Upload Statement</button>

            <p className="text-center my-4">--- or ---</p>

            <h6>Enter transactions manually</h6>
            <p>This should only be cash transactions</p>
            <button className="btn btn-light btn-sm">My Transactions</button>
          </div>
          <div className="col-sm-3 d-card">
            Income
          </div>
          <div className="col-sm-3 d-card">
            Expenses
          </div>
        </div>
        </div>
      </section>
    )
  }
}

export default DHome;
