import { IOrderLineRepository } from "../../../interfaces/repositories/IOrderLineRepository";
import { OrderLine } from "../../entities/orders/OrderLine";
import { BusinessError } from "../../../shared/errors/BusinessError";

export class GetOrderLinesByOrder {
  constructor(private orderLineRepo: IOrderLineRepository) {}

  async execute(orderId: number): Promise<OrderLine[]> {
    try {
      return await this.orderLineRepo.findByOrder(orderId);
    } catch (err) {
      throw new BusinessError("Erreur lors de la récupération des lignes de commande", {
        details: [typeof err === "object" && err !== null && "message" in err ? (err as any).message : String(err)],
      });
    }
  }
}
