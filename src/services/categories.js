import httpInterface from '../utils/httpInterface';
import apiRoutes from '../utils/routes';

const categories = {
  async getAll(cb) {
    try {
      const response = await httpInterface.getData(apiRoutes.parentCategoriesWithCategories().path);
      const resData = await response.json();

      if (response.ok) {
        cb(true, resData)
      } else {
        cb(false, resData)
      }
    } catch (error) {
      console.log('ERROR:GetAllParentCategoriesWithCategories - ', error)
    }
  },
  async create(data, cb) {
    try {
      const payload = formatPayload(data);
      const createRoute = apiRoutes.createCategory();

      const response = await httpInterface.postData(createRoute.path, createRoute.method, payload);
      const resData = await response.json();

      if (response.ok) {
        cb(true, resData);
      } else {
        cb(false, resData)
      }
    } catch (error) {
      console.log('ERROR:CreateCategory - ', error)
    }
  }
};

const formatPayload = data => {
  return {
    category: data
  }
};

export default categories
