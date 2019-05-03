import React, { Component } from 'react';
import './Navbar.scss';
import { Link, NavLink } from 'react-router-dom';
import userAuth from '../../services/authenticate';

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
    const { title } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" id="logo-title" className="navbar-brand logo-text">
          {title || titleOverride}
        </Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav mr-auto"></div>
          <div>
          {
            userAuth.isAuthenticated ? (
              <div>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <button className="btn btn-light dropdown-toggle" type="button" id="navbarDropdownMenuLinks" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Hi, { userAuth.authName }
                    </button>

                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLinks">
                      <NavLink to="/profile" className="dropdown-item" activeClassName="active">Profile</NavLink>
                      <NavLink to="/settings" className="dropdown-item" activeClassName="active">Settings</NavLink>
                      <div className="dropdown-divider"></div>
                      <Link to="/" onClick={this._handleSignOut} className="dropdown-item sign-out">
                        Sign Out
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            ) : (
              <div>
                <Link to="/auth/login">
                  <button className="btn btn-light my-2 my-sm-0">Log In</button>
                </Link>
                <Link to="/auth/sign-up">
                  <button className="btn btn-primary btn-fo-primary my-2 my-sm-0 ml-2">Sign Up</button>
                </Link>
              </div>
            )
          }
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar;
