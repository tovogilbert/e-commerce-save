import Axios from '../data/api/axios';

class Service {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async getAll() {
    try {
      const response = await Axios.get(this.endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error fetching all ${this.endpoint}:`, error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const response = await Axios.get(`${this.endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${this.endpoint} by id ${id}:`, error);
      throw error;
    }
  }

  async create(data) {
    try {
      const response = await Axios.post(this.endpoint, data);
      return response.data;
    } catch (error) {
      console.error(`Error creating ${this.endpoint}:`, error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const response = await Axios.put(`${this.endpoint}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating ${this.endpoint} with id ${id}:`, error);
      throw error;
    }
  }

  async delete(id) {
    try {
      await Axios.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      console.error(`Error deleting ${this.endpoint} with id ${id}:`, error);
      throw error;
    }
  }
}

export default Service;