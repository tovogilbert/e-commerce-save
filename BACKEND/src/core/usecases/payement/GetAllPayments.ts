import { Payment } from "../../entities/payment/Payment";
import { IPaymentRepository } from "../../../interfaces/repositories/IPaymentRepository";

export class GetAllPayments {
  constructor(private readonly paymentRepository: IPaymentRepository) {}

  async execute(): Promise<Payment[]> {
    return this.paymentRepository.findAll();
  }
}