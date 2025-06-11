import { Payment } from "../../../core/entities/payment/Payment"
import { PaymentResponseDTO } from "../dtos/responses/payment.dto";

export class PaymentMapper {
  static toDTO(payment: Payment): PaymentResponseDTO {
  return {
    id: payment.id,
    paymentDate: payment.paymentDate,
    amount: payment.amount,
    method: payment.method,
    transactionRef: payment.transactionRef,
    createdAt: payment.paymentDate, // À remplacer si vous avez accès aux vrais champs
    updatedAt: payment.paymentDate
  };
}

  static toDTOList(payments: Payment[]): PaymentResponseDTO[] {
    return payments.map(payment => this.toDTO(payment));
  }
}