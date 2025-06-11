import { IOrderRepository } from '../../../interfaces/repositories/IOrderRepository';
import { BusinessError } from '../../../shared/errors/BusinessError';

export class DeleteOrder {
  constructor(private readonly orderRepo: IOrderRepository) {}

  async execute(orderId: number): Promise<void> {
    try {
      await this.orderRepo.delete(orderId);
    } catch (error: any) {
      throw new BusinessError("Erreur lors de la suppression de la commande", { details: [error.message] });
    }
  }
}
