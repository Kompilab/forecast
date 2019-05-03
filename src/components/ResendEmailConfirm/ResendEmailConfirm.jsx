import React, { Component } from 'react';
import './ResendEmailConfirm.scss';
import { Link } from 'react-router-dom';
import Icon from 'react-web-vector-icons';
import userAuth from '../../services/authenticate';
import FormattersHelpers from '../../helpers/formatter_helpers';

class ResendEmailConfirm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      errors: null,
      loading: false
    }

    this.handleChange = this.handleChange.bind(this);
    this._resendConfirmation = this._resendConfirmation.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  _resendConfirmation(e) {
    this.setState({loading: true, errors: null});
    e.preventDefault();

    userAuth.resendEmailConfirm(this.state.email, (redirect, error='') => {
      this.setState({
        errors: error,
        loading: false
      })

      if (redirect) {
        const { history } = this.props;
        history.push('/auth/confirm')
      }
    })
  }

  render() {
    const { errors, loading } = this.state;
    const errorClass = '';

    return (
      <div className="auth-resend-email-confirm">
        <h2>Resend Email Confirmation</h2>
        <p>Already confirmed email? <Link to="/auth/login">Log in</Link></p>

        <ul>{ errors && FormattersHelpers.formatErrors(errors) }</ul>

        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="token">
              <Icon
                font="SimpleLineIcons"
                name="envelope"
                color='#6c6c6c'
                size={18}
              />
              <span>Email</span>
            </label>
            <div>
              <input
                id="email"
                type="text"
                name="email"
                onChange={this.handleChange}
                className={`form-control ${errorClass}`} />
            </div>
          </div>

          <div className="actions">
            <button onClick={this._resendConfirmation} className="btn btn-primary btn-fo-primary btn-block" disabled={loading}>
              {
                loading ? (
                  <div>
                    <Icon
                      font="EvilIcons"
                      name="spinner-2"
                      color='#ffffff'
                      size={18}
                    />
                    <div>Please wait...</div>
                  </div>
                ) : (
                  <div>Resend Email</div>
                )
              }
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default ResendEmailConfirm
