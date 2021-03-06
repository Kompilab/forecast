import currentUser from "./currentUser";

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
  },
  parentCategoriesWithCategories: () => {
    return {
      method: 'GET',
      path: '/api/v1/parent_categories?with_categories=true'
    }
  },
  createCategory: () => {
    return {
      method: 'POST',
      path: '/api/v1/categories'
    }
  },
  paymentMethods: () => {
    return {
      method: 'GET',
      path: '/api/v1/financial_transactions/payment_methods'
    }
  },
  transactionCalculations: () => {
    return {
      method: 'GET',
      path: `/api/v1/financial_transactions/${currentUser.id}/calculations`
    }
  },
  supportedBanks: () => {
    return {
      method: 'GET',
      path: '/api/v1/bank_statements/supported_banks'
    }
  },
  bankStatements: () => {
    return {
      method: 'GET',
      path: '/api/v1/bank_statements'
    }
  },
  uploadBankStatement: () => {
    return {
      method: 'POST',
      path: '/api/v1/bank_statements'
    }
  }
};

export default apiRoutes
