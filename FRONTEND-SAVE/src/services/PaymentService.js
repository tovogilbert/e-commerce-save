import Service from './service';
import { createPayment, getAllPayments, getPaymentById } from '../data/constants/endPoint';
import Axios from '../data/api/axios';

class PaymentService extends Service {
  constructor() {
    super(getAllPayments);
  }
}

export default new PaymentService();