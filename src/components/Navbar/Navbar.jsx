import React, { Component } from 'react';
import './Navbar.scss';
import { Link, NavLink } from 'react-router-dom';
import userAuth from '../../services/authenticate';
import Icon from 'react-web-vector-icons';

class Navbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      titleOverride: 'forecast'
    }

    this._handleSignOut = this._handleSignOut.bind(this)
  }

  _handleSignOut(e) {
    e.preventDefault();
    const { history } = this.props;
    userAuth.signOut(() => history.push('/'))
  }

  render() {
    const { titleOverride } = this.state;
    const { title, hideMenu } = this.props;
    const dashboardRoutes = [
      {
        name: 'Dashboard',
        path: '/dashboard',
        exact: true
      },
      {
        name: 'Transactions',
        path: '/dashboard/transactions'
      },
      {
        name: 'Categories',
        path: '/dashboard/categories'
      }
    ];

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {
          userAuth.isAuthenticated && !hideMenu ? (
            <div className="mr-2 menu-dropdowns">
              <div id="menuDropdown" className="menu-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <Icon
                  font="Ionicons"
                  name="ios-menu"
                  color='#9b9b9b'
                  size={30}
                  // style={{}}
                />
              </div>
              <div className="dropdown-menu" aria-labelledby="menuDropdown">
                { dashboardRoutes.map((route, index) => (
                  <NavLink
                    key={index}
                    to={route.path}
                    exact={route.exact}
                    className="dropdown-item"
                    activeClassName="active">
                    {route.name}
                  </NavLink>
                ))}
              </div>
            </div>
          ) : null
        }
        <Link to="/" id="logo-title" className="navbar-brand logo-text">
          {title || titleOverride}
        </Link>

        {
          userAuth.isAuthenticated ? (
            <div className="ml-auto">
              <button className="btn btn-light dropdown-toggle" type="button" id="navbarDropdownMenuLinks" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Hi, { userAuth.firstName }
              </button>

              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLinks">
                <NavLink to="/profile" className="dropdown-item" activeClassName="active">Profile</NavLink>
                <NavLink to="/settings" className="dropdown-item" activeClassName="active">Settings</NavLink>
                <div className="dropdown-divider"></div>
                <Link to="/" onClick={this._handleSignOut} className="dropdown-item sign-out">
                  Sign Out
                </Link>
              </div>
            </div>
          ) : (
            <div className="ml-auto">
              <Link to="/auth/login">
                <button className="btn btn-light my-2 my-sm-0">Log In</button>
              </Link>
              <Link to="/auth/sign-up">
                <button className="btn btn-primary btn-fo-primary my-2 my-sm-0 ml-2">Sign Up</button>
              </Link>
            </div>
          )
        }
      </nav>
    )
  }
}

export default Navbar;
