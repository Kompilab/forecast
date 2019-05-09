import httpInterface from '../utils/httpInterface';
import apiRoutes from '../utils/routes';

const globalRequests = {
  async transactionsInitData(cb) {
    try {
      const allResponses = await httpInterface.processMultiple(
        [apiRoutes.transactions(), apiRoutes.parentCategoriesWithCategories()]
      );

      let isSuccess = false;

      const resData = allResponses.map(async (response) => {
        if (response.ok) {
          isSuccess = true;
        }

        return await response.json()
      })

      cb(isSuccess, resData)
    } catch (error) {
      console.log('ERROR:GetTransactionsInitData - ', error)      
    }
  },
  async initTransactionFormData(cb) {
    try {
      const allResponses = await httpInterface.processMultiple(
        [apiRoutes.parentCategoriesWithCategories(), apiRoutes.paymentMethods()]
      );

      let isSuccess = false;

      const resData = allResponses.map(async (response) => {
        if (response.ok) {
          isSuccess = true;
        }

        return await response.json()
      })

      cb(isSuccess, resData)
    } catch (error) {
      console.log('ERROR:initTransactionFormData - ', error)      
    }
  }
};

export default globalRequests
