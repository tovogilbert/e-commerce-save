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
    // Validation des données
    PaymentValidator.validate(input);

    // Création du paiement
    const payment = new Payment(
      0, // id (set to 0 or undefined if your repository will assign it)
      new Date(), // paymentDate
      input.amount,
      input.method,
      input.transactionRef
    );

    // Persistance
    await this.paymentRepository.save(payment);

    return payment;
  }
}