import { ParticularClient } from "../../entities/client/ParticularClient";
import { IClientRepository } from "../../../interfaces/repositories/IClientRepository";
import { ClientValidator } from "../../validations/ClientValidator";
import { BusinessError } from "../../../shared/errors/BusinessError";

export class CreateParticularClient {
  constructor(private repo: IClientRepository) {}

  async execute(data: {
    "firstName": string;
    "lastName": string;
    "email": string;
    "telephone": string;
    "adresse": string;
  }): Promise<ParticularClient> {
    try {
      // Validation des données d'entrée
      ClientValidator.validateParticular(data);

      // Vérification de l'unicité de l'email
      const existingClient = await this.repo.findByEmail(data.email);
      if (existingClient) {
        throw new BusinessError("L'email est déjà utilisé par un autre client", {
          errorCode: "EMAIL_ALREADY_EXISTS",
          details: [
            `Email: ${data.email}`,
            `Type de client: Particulier`
          ]
        });
      }

      // Création de l'entité métier
      const client = new ParticularClient(
        crypto.randomUUID(),
        data.firstName,
        data.lastName,
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
          `Nom complet: ${data.firstName} ${data.lastName}`,
          `Téléphone: ${data.telephone}`
        ];
        throw error;
      }
      
      // On encapsule les autres erreurs
      throw new BusinessError("Erreur lors de la création du client particulier", {
        errorCode: "CLIENT_CREATION_FAILED",
        details: [
          `Erreur originale: ${error instanceof Error ? error.message : String(error)}`,
          `Données: ${JSON.stringify({
            "firstName": data.firstName,
            "lastName": data.lastName,
            "email": data.email
          })}`
        ]
      });
    }
  }
}