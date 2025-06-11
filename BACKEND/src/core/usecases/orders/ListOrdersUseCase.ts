import { Order } from "../../../core/entities/orders/Order";
import { IOrderRepository } from "../../../interfaces/repositories/IOrderRepository";
import { IOrderLineRepository } from "../../../interfaces/repositories/IOrderLineRepository";
import { BusinessError } from "../../../shared/errors/BusinessError";

export class ListOrdersUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private orderLineRepository: IOrderLineRepository
  ) {}

  async execute(options?: {
    clientId?: string;
    includeLines?: boolean;
  }): Promise<Order[]> {
    try {
      if (options?.clientId) {
        // Récupérer les commandes d'un client spécifique
        return await this.orderRepository.findByClient(options.clientId);
      } else {
        // Récupérer toutes les commandes
        const orders = await this.orderRepository.findAll();

        // Si on demande à inclure les lignes de commande
        if (options?.includeLines) {
          for (const order of orders) {
            const lines = await this.orderLineRepository.findByOrder(order.id);
            order.lines = lines;
          }
        }

        return orders;
      }
    } catch (error) {
      throw new BusinessError(
        "Erreur lors de la récupération des commandes",
        {
          errorCode: "ORDERS_FETCH_ERROR",          
        }
      );
    }
  }
}