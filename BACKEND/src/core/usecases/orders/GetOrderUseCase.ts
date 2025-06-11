import { Order } from "../../../core/entities/orders/Order";
import { IOrderRepository } from "../../../interfaces/repositories/IOrderRepository";

export class GetOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(id: number): Promise<Order | null> {
    return this.orderRepository.findWithLines(id);
  }
}