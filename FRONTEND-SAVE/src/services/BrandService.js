import Service from './service';
import { getAllBrands, getBrandByExactName, searchBrands } from '../data/constants/endPoint';
import Axios from '../data/api/axios';

class BrandService extends Service {
  constructor() {
    super(getAllBrands);
  }

  async getByExactName(name) {
    try {
      const response = await Axios.get(getBrandByExactName, { params: { name } });
      return response.data;
    } catch (error) {
      console.error(`Error fetching brand by exact name ${name}:`, error);
      throw error;
    }
  }

  async search(query) {
    try {
      const response = await Axios.get(searchBrands, { params: { q: query } });
      return response.data;
    } catch (error) {
      console.error(`Error searching brands with query ${query}:`, error);
      throw error;
    }
  }
}

export default new BrandService();