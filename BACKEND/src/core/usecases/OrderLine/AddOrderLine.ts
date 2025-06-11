import { IOrderLineRepository } from "../../../interfaces/repositories/IOrderLineRepository";
import { OrderLine } from "../../entities/orders/OrderLine";
import { BusinessError } from "../../../shared/errors/BusinessError";

export class AddOrderLine {
  constructor(private orderLineRepo: IOrderLineRepository) {}

  async execute(orderLine: OrderLine): Promise<OrderLine> {
    try {
      return await this.orderLineRepo.save(orderLine);
    } catch (err) {
      throw new BusinessError("Erreur lors de l'ajout de la ligne de commande", {
        details: [err instanceof Error ? err.message : String(err)],
      });
    }
  }
}

