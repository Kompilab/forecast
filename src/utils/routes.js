const apiRoutes = {
  login: () => {
    return {
      method: 'POST',
      path: '/api/auth/sign_in'
    }
  },
  signup: () => {
    return {
      method: 'POST',
      path: '/api/auth/register'
    }
  },
  signout: () => {
    return {
      method: 'DELETE',
      path: '/api/auth/sign_out'
    }
  },
  confirm: (token) => {
    return {
      method: 'GET',
      path: `/api/auth/confirmation?confirmation_token=${token}`
    }
  },
  resendConfirm: () => {
    return {
      method: 'POST',
      path: '/api/auth/confirmation'
    }
  },
  transactions: () => {
    return {
      method: 'GET',
      path: '/api/v1/financial_transactions'
    }
  },
  createTransaction: () => {
    return {
      method: 'POST',
      path: '/api/v1/financial_transactions'
    }
  }
};

export default apiRoutes
