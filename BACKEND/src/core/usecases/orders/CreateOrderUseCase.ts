import { IOrderLineRepository } from "../../../interfaces/repositories/IOrderLineRepository";
import { Order } from "../../../core/entities/orders/Order";
import { IOrderRepository } from "../../../interfaces/repositories/IOrderRepository";
import { OrderValidator } from "../../validations/OrderValidator"
import { BusinessError } from "../../../shared/errors/BusinessError";
import { OrderLine } from "../../../core/entities/orders/OrderLine";

export class CreateOrderUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private orderLineRepository: IOrderLineRepository
  ) {}

  async execute(orderData: Partial<Order>): Promise<Order> {
    // Validation des données de la commande
    OrderValidator.validate(orderData);

    // Calcul des totaux si non fournis
    this.calculateOrderTotals(orderData);

    // Vérification du stock pour chaque produit
    await this.checkStockAvailability(orderData.lines || []);

    // Enregistrement de la commande
    const savedOrder = await this.orderRepository.save(orderData as Order);

    // Enregistrement des lignes de commande
    for (const line of orderData.lines || []) {
      line.orderId = savedOrder.id;
      await this.orderLineRepository.save(line);
    }

    return savedOrder;
  }

  private calculateOrderTotals(orderData: Partial<Order>) {
    if (!orderData.lines || orderData.lines.length === 0) {
      throw new BusinessError("La commande doit contenir au moins une ligne");
    }

    // Calcul du sous-total
    orderData.subtotal = orderData.lines.reduce(
      (sum, line) => sum + line.unitPrice * line.quantity,
      0
    );

    // Calcul des taxes (exemple: 20%)
    orderData.tax = orderData.subtotal * 0.2;

    // Calcul du total (sous-total + taxes + frais de livraison - remise)
    orderData.total =
      (orderData.subtotal || 0) +
      (orderData.tax || 0) +
      (orderData.shippingFee || 0) -
      (orderData.discount || 0);
  }

  private async checkStockAvailability(lines: OrderLine[]) {
    for (const line of lines) {
      if (line.quantity > line.product.stockQty) {
        throw new BusinessError(
          `Stock insuffisant pour le produit ${line.product.name}. Stock disponible: ${line.product.stockQty}, Quantité demandée: ${line.quantity}`
        );
      }
    }
  }
}