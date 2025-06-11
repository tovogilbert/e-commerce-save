import { IOrderRepository } from '../../../interfaces/repositories/IOrderRepository';
import { Order } from '../../entities/orders/Order';
import { BusinessError } from '../../../shared/errors/BusinessError';

export class GetOrderById {
  constructor(private readonly orderRepo: IOrderRepository) {}

  async execute(orderId: number): Promise<Order> {
    try {
      const order = await this.orderRepo.findWithLines(orderId);
      if (!order) throw new BusinessError('Commande non trouvée');
      return order;
    } catch (error: any) {
      throw new BusinessError('Erreur lors de la récupération de la commande', { details: [error.message] });
    }
  }
}
