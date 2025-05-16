import { IClientRepository } from "../../../interfaces/repositories/IClientRepository";
import { BusinessClient } from "../../entities/client/BusinessClient";
import { ParticularClient } from "../../entities/client/ParticularClient";
import { BusinessError } from "../../../shared/errors/BusinessError";

export class ListClients {
  constructor(private repo: IClientRepository) {}

  async getAllParticuliers(): Promise<ParticularClient[]> {
    try {
      return await this.repo.findParticularClients();
    } catch (error) {
      throw new BusinessError("Échec de la récupération des clients particuliers", {
        errorCode: "PARTICULIER_LIST_FAILED",
        details: [error instanceof Error ? error.message : "Erreur inconnue"]
      });
    }
  }

  async getAllEntreprises(): Promise<BusinessClient[]> {
    try {
      return await this.repo.findBusinessClients();
    } catch (error) {
      throw new BusinessError("Échec de la récupération des clients entreprises", {
        errorCode: "BUSINESS_LIST_FAILED",
        details: [error instanceof Error ? error.message : "Erreur inconnue"]
      });
    }
  }
}