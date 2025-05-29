import { Payment } from "../../core/entities/payment/Payment";

export interface IPaymentRepository {
  // Enregistrement
  save(payment: Payment): Promise<Payment>;

  // Trouver par son identifiant
  findById(id: number): Promise<Payment | null>;

  // Obtenir la liste de tous les paiements
  findAll(): Promise<Payment[]>;
}
