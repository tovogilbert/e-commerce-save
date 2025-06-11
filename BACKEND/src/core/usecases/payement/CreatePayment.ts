import { Payment } from "../../entities/payment/Payment";
import { IPaymentRepository } from "../../../interfaces/repositories/IPaymentRepository";
import { PaymentValidator } from "../../validations/PaymentValidator";

export class CreatePayment {
  constructor(private readonly paymentRepository: IPaymentRepository) {}

  async execute(input: {
  amount: number;
  method: string;
  transactionRef: string;
}): Promise<Payment> {
  PaymentValidator.validate(input);

  return await this.paymentRepository.save(new Payment(
    0,
    new Date(),
    input.amount,
    input.method,
    input.transactionRef
  ));
}
}