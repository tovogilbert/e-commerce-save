import { BusinessClient } from "../../entities/client/BusinessClient";
import { IClientRepository } from "../../../interfaces/repositories/IClientRepository";
import { ClientValidator } from "../../validations/ClientValidator";
import { BusinessError } from "../../../shared/errors/BusinessError";

export class CreateBusinessClient {
  constructor(private repo: IClientRepository) {}

  async execute(data: {
    "companyName": string;
    "nif": string;
    "stat": string;
    "email": string;
    "telephone": string;
    "adresse": string;
  }): Promise<BusinessClient> {
    try {
      ClientValidator.validateBusiness(data);
      const existingClient = await this.repo.findByEmail(data.email);
      if (existingClient) {
        throw new BusinessError("L'email est déjà utilisé par un autre client", {
          errorCode: "EMAIL_ALREADY_EXISTS",
          details: [`Email: ${data.email}`]
        });
      }

      // Création de l'entité métier
      const client = new BusinessClient(
        crypto.randomUUID(),
        data.companyName,
        data.nif,
        data.stat,
        data.email,
        data.telephone,
        data.adresse
      );

      // Persistance
      await this.repo.save(client);
      return client;

    } catch (error) {
      if (error instanceof BusinessError) {
        error.details = error.details || [
          `Company: ${data.companyName}`,
          `NIF: ${data.nif}`
        ];
        throw error;
      }
      
      throw new BusinessError("Erreur lors de la création du client entreprise", {
        errorCode: "CLIENT_CREATION_FAILED",
        details: [
          `Erreur originale: ${error instanceof Error ? error.message : String(error)}`,
          `Données: ${JSON.stringify(data)}`
        ]
      });
    }
  }
}