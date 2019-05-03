import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import './Dashboard.scss';
import Navbar from '../../components/Navbar';

// import dashboard views
import DHome from './Views/DHome';
import Transactions from './Views/Transactions';

const dashboardRoutes = [
  {
    path: "/dashboard",
    exact: true,
    main: () => <DHome />
  },
  {
    path: "/dashboard/transactions",
    main: () => <Transactions />
  }
];


class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div>
        <Navbar {...this.props} />

        <Router>
          <div className="dashboard container-fluid">
            <div className="row">
              <div className="side-nav col-2">
                <ul className="nav-items">
                  <li className="nav-item">
                    <NavLink exact to="/dashboard" activeClassName="active">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/dashboard/transactions" activeClassName="active">Transactions</NavLink>
                  </li>
                </ul>
              </div>

              <div className="content col-10">
                {dashboardRoutes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                  />
                ))}
              </div>
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

export default Dashboard;
