import { Payment } from "../../entities/payment/Payment";
import { IPaymentRepository } from "../../../interfaces/repositories/IPaymentRepository";
import { BusinessError } from "../../../shared/errors/BusinessError";

export class FindPaymentById {
  constructor(private readonly paymentRepository: IPaymentRepository) {}

  async execute(id: number): Promise<Payment> {
    if (!id || id <= 0) {
      throw new BusinessError("ID de paiement invalide", {
        errorCode: "INVALID_ID"
      });
    }

    const payment = await this.paymentRepository.findById(id);

    if (!payment) {
      throw new BusinessError("Paiement non trouvé", {
        errorCode: "PAYMENT_NOT_FOUND"
      });
    }

    return payment;
  }
}