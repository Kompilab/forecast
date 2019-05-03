import httpInterface from '../utils/httpInterface';
import apiRoutes from '../utils/routes';
import Cookie from 'universal-cookie';

const cookie = new Cookie();

const concatName = data => {
  return data && `${data.first_name} ${data.last_name}`
};

const userAuth = {
  isAuthenticated: cookie.get('_fo_') && cookie.get('_fo_active_user_'),
  authName: concatName(cookie.get('_fo_active_user_')),
  async authenticate(data, cb) {
    try {
      const payload = formatPayload(data);
      const loginRoute = apiRoutes.login();

      const response = await httpInterface.postData(loginRoute.path, loginRoute.method, payload);
      const resData = await response.json();

      if (response.ok) {
        cookie.set('_fo_', response.headers.get('authorization'), { path: '/' });
        cookie.set('_fo_active_user_', {
          id: resData.id,
          email: resData.email,
          first_name: resData.first_name,
          last_name: resData.last_name,
          avatar: resData.avatar
        }, { path: '/' });

        this.isAuthenticated = true;
        this.authName = concatName(resData);
        cb(true);
      } else {
        cb(false, resData)
      }
    } catch (error) {
      console.log('ERROR:Login - ', error)
    }
  },
  async signUp(data, cb) {
    try {
      const payload = formatPayload(data);      
      const signUpRoute = apiRoutes.signup();

      const response = await httpInterface.postData(signUpRoute.path, signUpRoute.method, payload);
      const resData = await response.json();

      if (response.ok) {
        cb(true);
      } else {
        cb(false, resData)
      }
    } catch (error) {
      console.log('ERROR:SignUp - ', error)
    }
  },
  async confirmEmail(token, cb) {
    try {
      const response = await httpInterface.getData(apiRoutes.confirm(token).path);
      const resData = await response.json();

      if (response.ok) {
        cb(true)
      } else {
        cb(false, resData)
      }
    } catch (error) {
      console.log('ERROR:ConfirmEmail - ', error)
    }
  },
  async resendEmailConfirm(email, cb) {
    try {
      const payload = formatPayload({email});
      const resentRoute = apiRoutes.resendConfirm();

      const response = await httpInterface.postData(resentRoute.path, resentRoute.method, payload);
      const resData = await response.json();

      if (response.ok) {
        cb(true)
      } else {
        cb(false, resData)
      }
    } catch (error) {
      console.log('ERROR:ResendConfirmEmail - ', error)
    }
  },
  async signOut(cb) {
    try {
      const signOutRoute = apiRoutes.signout();
      const response = await httpInterface.postData(signOutRoute.path, signOutRoute.method);

      if (response.ok) {
        cookie.remove('_fo_');
        cookie.remove('_fo_active_user_');
        this.isAuthenticated = false;
        cb()
      } else {
        throw new Error('Failed to sign out!')
      }
    } catch (error) {
      console.log('ERROR:LogOut - ', error)
    }
  }
};

const formatPayload = data => {
  return {
    user: data
  }
};

export default userAuth;
