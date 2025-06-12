import Service from './service';
import {
  createIndividualClient,
  createBusinessClient,
  getIndividualClientById,
  getBusinessClientById,
  getClientByEmail,
  getAllIndividualClients,
  getAllBusinessClients,
  deleteClient
} from '../data/constants/endPoint';
import Axios from '../data/api/axios';

class ClientService extends Service {
  constructor() {
    super(getAllIndividualClients);
  }

  async createIndividual(data) {
    try {
      const response = await Axios.post(createIndividualClient, data);
      return response.data;
    } catch (error) {
      console.error('Error creating individual client:', error);
      throw error;
    }
  }

  async createBusiness(data) {
    try {
      const response = await Axios.post(createBusinessClient, data);
      return response.data;
    } catch (error) {
      console.error('Error creating business client:', error);
      throw error;
    }
  }

  async getIndividualById(id) {
    try {
      const response = await Axios.get(getIndividualClientById(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching individual client with id ${id}:`, error);
      throw error;
    }
  }

  async getBusinessById(id) {
    try {
      const response = await Axios.get(getBusinessClientById(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching business client with id ${id}:`, error);
      throw error;
    }
  }

  async getByEmail(email) {
    try {
      const response = await Axios.get(getClientByEmail(email));
      return response.data;
    } catch (error) {
      console.error(`Error fetching client with email ${email}:`, error);
      throw error;
    }
  }

  async getAllBusiness() {
    try {
      const response = await Axios.get(getAllBusinessClients);
      return response.data;
    } catch (error) {
      console.error('Error fetching all business clients:', error);
      throw error;
    }
  }
}

export default new ClientService();