
import { IOrderLineRepository } from "../../../interfaces/repositories/IOrderLineRepository";
import { BusinessError } from "../../../shared/errors/BusinessError";

export class UpdateOrderLineQuantity {
  constructor(private orderLineRepo: IOrderLineRepository) {}

  async execute(idDetail: number, quantity: number): Promise<void> {
    try {
      await this.orderLineRepo.updateQuantity(idDetail, quantity);
    } catch (err) {
      throw new BusinessError("Erreur lors de la mise à jour de la quantité de la ligne de commande", {
        details: [String(err)],
      });
  }
}
}

