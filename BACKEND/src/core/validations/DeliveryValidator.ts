import { DeliverySchemas } from "./shemas/DeliverySchemas";
import { BusinessError } from "../../shared/errors/BusinessError";
import { Delivery } from "../entities/delivery/Delivery";

export class DeliveryValidator {
  static validateDelivery(data: Partial<Delivery>): void {
    try {
      DeliverySchemas.base.validateSync(data, { abortEarly: false });
    } catch (err) {
      throw new BusinessError(this.formatErrors(err));
    }
  }

  private static formatErrors(err: any): string {
    return err.errors.join(', ');
  }
}