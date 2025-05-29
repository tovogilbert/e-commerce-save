// src/infrastructure/repositories/PaymentRepository.ts
import { Payment } from "../../core/entities/payment/Payment";
import { IPaymentRepository } from "../../interfaces/repositories/IPaymentRepository";
import { PaymentModel } from "../db/models/PaymentModel";
import { BusinessError } from "../../shared/errors/BusinessError";

export class PaymentRepository implements IPaymentRepository {
  findById(id: number): Promise<Payment | null> {
    throw new Error("Method not implemented.");
  }
  async save(payment: Payment): Promise<Payment> {
    try {
      if (typeof payment.method !== 'string' || payment.method.trim().length === 0) {
        throw new BusinessError("La méthode de paiement doit être une chaîne non vide", {
          errorCode: "INVALID_PAYMENT_METHOD"
        });
      }

      // Ne pas inclure l'ID ni les dates de création/maj
      const createdPayment = await PaymentModel.create({
        id: payment.id, // Laisser l'ID vide pour qu'il soit généré automatiquement
        paymentDate: payment.paymentDate,
        amount: payment.amount,
        method: payment.method,
        transactionRef: payment.transactionRef,
        createdAt: new Date(),
        updatedAt: new Date() 
      });

      return new Payment(
        createdPayment.id, // ID généré automatiquement
        createdPayment.paymentDate,
        createdPayment.amount,
        createdPayment.method,
        createdPayment.transactionRef
      );
    } catch (error) {
      throw new BusinessError("Erreur lors de la sauvegarde du paiement", {
        errorCode: "PAYMENT_SAVE_ERROR",
        details: [error instanceof Error ? error.message : String(error)]
      });
    }
  }

  async findAll(): Promise<Payment[]> {
    const paymentsData = await PaymentModel.findAll({
      order: [["paymentDate", "DESC"]]
    });

    return paymentsData.map(p => new Payment(
      p.id,
      p.paymentDate,
      p.amount,
      p.method,
      p.transactionRef
    ));
  }
}