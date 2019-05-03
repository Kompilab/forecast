import React, { Component } from 'react';
import './Login.scss';
import { Link, Redirect } from 'react-router-dom';
import userAuth from '../../services/authenticate';
import Icon from 'react-web-vector-icons';
import FormattersHelpers from '../../helpers/formatter_helpers';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
      email: '',
      password: '',
      rememberMe: false,
      error: null,
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this._login = this._login.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  _login(e) {
    this.setState({loading: true, error: null});
    e.preventDefault();

    userAuth.authenticate(this.prepData(this.state), (redirect, error='') => {
      this.setState({
        redirectToReferrer: redirect,
        error: error,
        loading: false
      })
    })
  }

  prepData(raw) {
    return {
      email: raw.email,
      password: raw.password
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer, error, loading } = this.state;
    const errorClass = '';

    if (redirectToReferrer || userAuth.isAuthenticated) {
      return <Redirect to={from} />
    }

    return (
      <div className="auth-sign-in">
        <h2>Sign In</h2>
        <p>Don't have a forecast account? <Link to="/auth/sign-up">Sign up now</Link></p>
        <p><Link to="/auth/confirm">Confirm email</Link></p>

        {
          from.pathname === '/' ? null : (
            <p>You must log in</p>
          )
        }

        <p>{error && FormattersHelpers.formatErrors(error)}</p>

        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="email">
              <Icon
                font="SimpleLineIcons"
                name="envelope"
                color='#6c6c6c'
                size={18}
              />
              <span>Email</span>
            </label>
            <div>
              <input id="email" type="email" name="email" className={`form-control ${errorClass}`} onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <Icon
                font="SimpleLineIcons"
                name="lock"
                color='#6c6c6c'
                size={18}
              />
              <span>Password</span>
            </label>
            <div>
              <input id="password" type="password" name="password" className={`form-control ${errorClass}`} onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group form-check">
            <input name="rememberMe" type="checkbox" className="form-check-input" id="rememberMe" onChange={this.handleChange} />
            <label className="form-check-label" htmlFor="rememberMe">Remember me!</label>
          </div>

          <div className="actions">
            <button onClick={this._login} className="btn btn-primary btn-fo-primary btn-block" disabled={loading}>
              {
                loading ? (
                  <div>
                    <Icon
                      font="EvilIcons"
                      name="spinner-2"
                      color='#ffffff'
                      size={18}
                    />
                    <span>Please wait</span>
                  </div>
                ) : (
                  <div>Sign In</div>
                )
              }
            </button>
          </div>
        </form>

        <div className="terms-thingy">
          <p>By clicking Sign In, you agree to our Terms of Use and have read and acknowledge our Privacy Policy</p>
        </div>

        <div className="forgot-password">
          <Link to="/">I forgot my password</Link>
        </div>
      </div>
    )
  }
}

export default Login;
