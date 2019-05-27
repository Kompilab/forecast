import httpInterface from '../utils/httpInterface';
import apiRoutes from '../utils/routes';

const bankStatements = {
  // async getAll(cb) {
  //   try {
  //     const response = await httpInterface.getData(apiRoutes.transactions().path);
  //     const resData = await response.json();

  //     if (response.ok) {
  //       cb(true, resData)
  //     } else {
  //       cb(false, resData)
  //     }
  //   } catch (error) {
  //     console.log('ERROR:GetAllTransactions - ', error)
  //   }
  // },
  async upload(data, cb) {
    try {
      const bsRoute = apiRoutes.uploadBankStatement();

      const response = await httpInterface.postDataNoContentType(bsRoute.path, bsRoute.method, data);
      const resData = await response.json();

      if (response.ok) {
        cb(true, resData);
      } else {
        cb(false, resData)
      }
    } catch (error) {
      console.log('ERROR:UploadBankStatement - ', error)
    }
  }
};

export default bankStatements
