import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Auth.scss';
import Login from '../../components/Login';
import SignUp from '../../components/SignUp';
import ConfirmEmail from '../../components/ConfirmEmail';
import ResendEmailConfirm from '../../components/ResendEmailConfirm';

class Auth extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { authState } = this.props.match.params;
    const switchComponents = state => {
      switch (state) {
        case 'login':
          return <Login {...this.props} />
        case 'sign-up':
          return <SignUp {...this.props} />
        case 'confirm':
          return <ConfirmEmail {...this.props} />
        case 'resend-confirmation':
          return <ResendEmailConfirm {...this.props} />
        default:
          return <Login {...this.props} />
      }
    };

    return (
      <div className="auth container-fluid">
        <div className="auth-header">
          <h2 className="logo-text"><Link to="/">forecast</Link></h2>
        </div>
        
        <div className="row justify-content-center">
          <div className="auth-inner col-12 col-sm-8 col-md-7 col-lg-5 col-xl-4">
            { switchComponents(authState) }
          </div>
        </div>

        <div className="footer">
          <p>&copy; 2019 Kompilab. All rights reserved.</p>
        </div>
      </div>
    )
  }
}

export default Auth;
