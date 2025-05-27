import { Payment } from "../../../core/entities/payment/Payment"
import { PaymentResponseDTO } from "../dtos/responses/payment.dto";

export class PaymentMapper {
  static toDTO(payment: Payment): PaymentResponseDTO {
    return {
      "id": payment.id,
      "paymentDate": payment.paymentDate,
      "amount": payment.amount,
      "method": payment.method,
      "transactionRef": payment.transactionRef,
      "createdAt": new Date(), 
      "updatedAt": new Date() 
    };
  }

  static toDTOList(payments: Payment[]): PaymentResponseDTO[] {
    return payments.map(payment => this.toDTO(payment));
  }
}