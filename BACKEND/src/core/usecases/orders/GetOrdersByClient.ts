
import { IOrderRepository } from '../../../interfaces/repositories/IOrderRepository';
import { Order } from '../../entities/orders/Order';
import { BusinessError } from '../../../shared/errors/BusinessError';

export class GetOrdersByClient {
  constructor(private readonly orderRepo: IOrderRepository) {}

  async execute(clientId: string): Promise<Order[]> {
    try {
      return await this.orderRepo.findByClient(clientId);
    } catch (error: any) {
      throw new BusinessError("Erreur lors de la récupération des commandes du client", { details: [error.message] });
    }
  }
}
