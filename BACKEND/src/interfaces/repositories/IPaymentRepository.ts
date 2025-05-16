import { Payment } from "../../core/entities/payment/Payment";

export interface IPaymentRepository {
   // Enregistrement
  save(payment: Payment): Promise<void>;

  //
  findById(id: number): Promise<Payment | null>;
  delete(id: number): Promise<void>;
}
