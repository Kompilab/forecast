import httpInterface from '../utils/httpInterface';
import apiRoutes from '../utils/routes';

const transactions = {
  async getAll(cb) {
    try {
      const response = await httpInterface.getData(apiRoutes.transactions().path);
      const resData = await response.json();

      if (response.ok) {
        cb(true, resData)
      } else {
        cb(false, resData)
      }
    } catch (error) {
      console.log('ERROR:GetAllTransactions - ', error)
    }
  },
  async create(data, cb) {
    try {
      const payload = formatPayload(data);
      const txRoute = apiRoutes.createTransaction();

      const response = await httpInterface.postData(txRoute.path, txRoute.method, payload);
      const resData = await response.json();

      if (response.ok) {
        cb(true, resData);
      } else {
        cb(false, resData)
      }
    } catch (error) {
      console.log('ERROR:CreateTransaction - ', error)
    }
  }
};

const formatPayload = data => {
  return {
    financial_transactions: data
  }
};

export default transactions
