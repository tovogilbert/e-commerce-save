import { IClientRepository } from "../../../interfaces/repositories/IClientRepository";
import { Client } from "../../entities/client/Client";
import { BusinessError } from "../../../shared/errors/BusinessError";

export class GetClientByEmail {
  constructor(private repo: IClientRepository) {}

  async execute(email: string): Promise<Client> {
    try {
      const client = await this.repo.findByEmail(email);
      if (!client) {
        throw new BusinessError("Client non trouvé", {
          errorCode: "CLIENT_NOT_FOUND",
          details: [`Email: ${email}`]
        });
      }
      return client;
    } catch (error) {
      if (error instanceof BusinessError) throw error;
      throw new BusinessError("Échec de la récupération du client", {
        errorCode: "CLIENT_EMAIL_RETRIEVAL_FAILED",
        details: [error instanceof Error ? error.message : "Erreur inconnue"]
      });
    }
  }
}
