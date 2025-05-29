import { ClientResponseDTO } from "../dtos/responses/ClientResponse.dto";
import { Client } from "../../../core/entities/client/Client";
import { BusinessClient } from "../../../core/entities/client/BusinessClient";
import { ParticularClient } from "../../../core/entities/client/ParticularClient";

export class ClientMapper {
  static toDTO(client: Client): ClientResponseDTO {
    const base: ClientResponseDTO = {
      "id": client.id,
      "email": client.email,
      "telephone": client.telephone,
      "adresse": client.adresse,
      "createdAt": client.createdAt,
      "clientType": client.getClientType() as "particulier" | "entreprise",
    };

    if (client instanceof ParticularClient) {
      return {
        ...base,
        "fullName": client.fullName,
      };
    }

    if (client instanceof BusinessClient) {
      return {
        ...base,
        "companyName": client.companyName,
        "nif": client.nif,
        "stat": client.stat,
      };
    }

    return base;
  }
}
