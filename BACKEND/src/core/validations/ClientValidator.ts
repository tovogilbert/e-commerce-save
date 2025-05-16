import { ClientSchemas } from "./shemas/ClientSchemas";
import { BusinessError } from "../../shared/errors/BusinessError";
import { ParticularClient } from "../entities/client/ParticularClient";
import { BusinessClient } from "../entities/client/BusinessClient";

export class ClientValidator {
  static validateParticular(data: Partial<ParticularClient>): void {
    try {
      ClientSchemas.particulier.validateSync(data, { abortEarly: false });
    } catch (err) {
      throw new BusinessError(this.formatErrors(err));
    }
  }

  static validateBusiness(data: Partial<BusinessClient>): void {
    try {
      ClientSchemas.entreprise.validateSync(data, { abortEarly: false });
    } catch (err) {
      throw new BusinessError(this.formatErrors(err));
    }
  }

  private static formatErrors(err: any): string {
    return err.errors.join(', ');
  }
}