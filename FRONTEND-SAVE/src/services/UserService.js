import Service from './service';
import { registerUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser } from '../data/constants/endPoint';
import Axios from '../data/api/axios';

class UserService extends Service {
  constructor() {
    super(getAllUsers);
  }

  async register(data) {
    try {
      const response = await Axios.post(registerUser, data);
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }

  async login(credentials) {
    try {
      const response = await Axios.post(loginUser, credentials);
      return response.data;
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  }
}

export default new UserService();