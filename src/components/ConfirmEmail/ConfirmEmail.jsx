import React, { Component } from 'react';
import './ConfirmEmail.scss';
import { Link } from 'react-router-dom';
import Icon from 'react-web-vector-icons';
import userAuth from '../../services/authenticate';
import FormattersHelpers from '../../helpers/formatter_helpers';

class ConfirmEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      errors: null,
      loading: false,
      inputDisabled: false
    };

    this.handleChange = this.handleChange.bind(this);
    this._confirmEmail = this._confirmEmail.bind(this);
  }

  componentDidMount() {
    const params = this.props.location.search;

    if (params) {
      const token = params.split('=')[1];

      this.setState({
        token: token,
        inputDisabled: true
      });

      this._confirmEmail({preventDefault: () => {}}, token)
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  _confirmEmail(e, t=null) {
    this.setState({loading: true, errors: null});
    e.preventDefault();

    const token = t || this.state.token;

    userAuth.confirmEmail(token, (redirect, error='') => {
      this.setState({
        errors: error,
        loading: false
      });

      if (redirect) {
        const { history } = this.props;
        history.replace('/auth/login')
      }
    })
  }

  render() {
    const { errors, loading, token, inputDisabled } = this.state;
    const errorClass = '';

    return (
      <div className="auth-confirm-email">
        <h2>Confirm my Account</h2>
        <p><Link to="/auth/resend-confirmation">Resend confirmation email</Link></p>

        <ul>{ errors && FormattersHelpers.formatErrors(errors) }</ul>

        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="token">
              <Icon
                font="SimpleLineIcons"
                name="lock"
                color='#6c6c6c'
                size={18}
              />
              <span>Token</span>
            </label>
            <div>
              <input
                id="token"
                type="text"
                name="token"
                value={token}
                disabled={inputDisabled}
                onChange={this.handleChange}
                className={`form-control ${errorClass}`} />
            </div>
          </div>

          <div className="actions">
            <button onClick={this._confirmEmail} className="btn btn-primary btn-fo-primary btn-block" disabled={loading}>
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
                  <div>Confirm Email</div>
                )
              }
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default ConfirmEmail
