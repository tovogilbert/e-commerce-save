import { Order } from "../../../core/entities/orders/Order";
import { IOrderRepository } from "../../../interfaces/repositories/IOrderRepository";
import { OrderValidator } from "../../validations/OrderValidator"
import { BusinessError } from "../../../shared/errors/BusinessError";

export class CreateOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(order: Order): Promise<Order> {
    // Validation
    OrderValidator.validate(order);

    // Calcul des totaux
    this.calculateOrderTotals(order);

    // Vérification du stock
    await this.checkStockAvailability(order);

    // Enregistrement
    await this.orderRepository.save(order);
    return order;
  }

  private calculateOrderTotals(order: Order): void {
    order.subtotal = order.lines.reduce((sum, line) => sum + (line.unitPrice * line.quantity), 0);
    order.tax = order.subtotal * 0.2; 
    order.total = order.subtotal + order.tax + order.shippingFee - order.discount;
  }

  private async checkStockAvailability(order: Order): Promise<void> {
    for (const line of order.lines) {
      if (line.quantity > line.product.stockQty) {
        throw new BusinessError(`Stock insuffisant pour le produit ${line.product.name}`);
      }
    }
  }
}