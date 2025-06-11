import { IOrderLineRepository } from "../../../interfaces/repositories/IOrderLineRepository";
import { BusinessError } from "../../../shared/errors/BusinessError";

export class DeleteOrderLine {
  constructor(private orderLineRepo: IOrderLineRepository) {}

  async execute(idDetail: number): Promise<void> {
    try {
      await this.orderLineRepo.delete(idDetail);
    } catch (err) {
      throw new BusinessError("Erreur lors de la suppression de la ligne de commande", {
        details: [typeof err === "object" && err !== null && "message" in err ? (err as any).message : String(err)],
      });
    }
  }
}
