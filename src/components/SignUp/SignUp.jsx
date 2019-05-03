import React, { Component } from 'react';
import './SignUp.scss';
import { Link, Redirect } from 'react-router-dom';
import userAuth from '../../services/authenticate';
import Icon from 'react-web-vector-icons';

class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',

      loading: false,
      errors: null
    }

    this.handleChange = this.handleChange.bind(this);
    this._signup = this._signup.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  _signup(e) {
    this.setState({loading: true, errors: null});
    e.preventDefault();

    userAuth.signUp(this.prepData(this.state), (redirect, errors='') => {
      this.setState({
        errors: errors,
        loading: false
      })

      if (redirect) {
        // TODO redirect to email confirmation later
        const { history } = this.props;
        history.replace('/auth/login')
      }
    })
  }

  prepData(raw) {
    return {
      first_name: raw.firstName,
      last_name: raw.lastName,
      phone_number: raw.phoneNumber,
      email: raw.email,
      password: raw.password,
      password_confirmation: raw.confirmPassword
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { errors, loading } = this.state;
    const errorClass = null;

    if (userAuth.isAuthenticated) {
      return <Redirect to={from} />
    }

    return (
      <div className="auth-sign-up">
        <h2>Sign Up</h2>
        <p>Have an account? <Link to="/auth/login">Sign in</Link></p>

        <p>Take charge of your cash flow and better understand your spending habit.</p>

        <p>{errors && errors.error}</p>

        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="in-firstname">First Name</label>
            <div>
              <input id="in-firstname" type="text" name="firstName" className={`form-control ${errorClass}`} onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="in-lastname">Last Name</label>
            <div>
              <input id="in-lastname" type="text" name="lastName" className={`form-control ${errorClass}`} onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="in-phonenumber">Phone Number</label>
            <div>
              <input id="in-phonenumber" type="number" name="phoneNumber" className={`form-control ${errorClass}`} onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="in-email">Email Address</label>
            <div>
              <input id="in-email" type="email" name="email" className={`form-control ${errorClass}`} onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="in-password">Password</label>
            <div>
              <input id="in-password" type="password" name="password" className={`form-control ${errorClass}`} onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="in-confirmpassword">Confirm Password</label>
            <div>
              <input id="in-confirmpassword" type="password" name="confirmPassword" className={`form-control ${errorClass}`} onChange={this.handleChange} />
            </div>
          </div>

          <div className="actions">
            <button onClick={this._signup} className="btn btn-primary btn-fo-primary btn-block" disabled={loading}>
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
                  <div>Sign Up</div>
                )
              }
            </button>
          </div>
        </form>

        <div className="terms-thingy">
          <p>By clicking Sign In, you agree to our Terms of Use and have read and acknowledge our Privacy Policy</p>
        </div>
      </div>
    )
  }
}

export default SignUp;
