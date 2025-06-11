
import { IOrderLineRepository } from '../../../interfaces/repositories/IOrderLineRepository';
import { OrderLine } from '../../entities/orders/OrderLine';
import { BusinessError } from '../../../shared/errors/BusinessError';

export class GetOrderLinesByOrder {
  constructor(private readonly orderLineRepo: IOrderLineRepository) {}

  async execute(orderId: number): Promise<OrderLine[]> {
    try {
      return await this.orderLineRepo.findByOrder(orderId);
    } catch (error: any) {
      throw new BusinessError("Erreur lors de la récupération des lignes de commande", { details: [error.message] });
    }
  }
}
