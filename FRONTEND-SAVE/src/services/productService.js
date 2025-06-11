// src/services/ProductService.js
import Service from './service';
import {   getProducts, getProductsByBrand, getProductsWithFeatures, searchProducts } from '../data/constants/endPoint';

class ProductService extends Service {
  constructor() {
    super(getProducts);
  }

  async getByBrand(brandId) {
    try {
      const response = await Axios.get(getProductsByBrand(brandId));
      return response.data;
    } catch (error) {
      console.error(`Error fetching products by brand ${brandId}:`, error);
      throw error;
    }
  }

  async getWithFeatures() {
    try {
      const response = await Axios.get(getProductsWithFeatures);
      return response.data;
    } catch (error) {
      console.error('Error fetching products with features:', error);
      throw error;
    }
  }

  async search(query) {
    try {
      const response = await Axios.get(searchProducts, { params: { q: query } });
      return response.data;
    } catch (error) {
      console.error(`Error searching products with query ${query}:`, error);
      throw error;
    }
  }
}

export default new ProductService();