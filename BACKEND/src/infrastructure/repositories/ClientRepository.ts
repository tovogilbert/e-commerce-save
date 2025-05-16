import { IClientRepository } from "../../interfaces/repositories/IClientRepository";
import { BusinessClient } from "../../core/entities/client/BusinessClient";
import { ParticularClient } from "../../core/entities/client/ParticularClient";
import { ClientModel } from "../db/models/ClientModel";
import { Client } from "../../core/entities/client/Client";

export class ClientRepository implements IClientRepository {
  async save(client: Client): Promise<void> {
    try {
      const data = {
        "id": client.id,
        "email": client.email,
        "telephone": client.telephone,
        "adresse": client.adresse,
        "createdAt": client.createdAt,
        "clientType": client.getClientType(),
      };

      if (client instanceof ParticularClient) {
        Object.assign(data, {
          "firstName": client.firstName,
          "lastName": client.lastName,
        });
      } else if (client instanceof BusinessClient) {
        Object.assign(data, {
          "companyName": client.companyName,
          "nif": client.nif,
          "stat": client.stat,
        });
      }

      await ClientModel.upsert(data);
    } catch (error) {
      console.error("Error saving client:", error);
      throw new Error("Failed to save client.");
    }
  }

  async findById(id: string): Promise<Client | null> {
    try {
      const data = await ClientModel.findByPk(id);
      if (!data) return null;

      return this.mapToEntity(data.toJSON());
    } catch (error) {
      console.error("Error finding client by ID:", error);
      throw new Error("Failed to find client by ID.");
    }
  }

  async findByEmail(email: string): Promise<Client | null> {
    try {
      const data = await ClientModel.findOne({ where: { email } });
      if (!data) return null;

      return this.mapToEntity(data.toJSON());
    } catch (error) {
      console.error("Error finding client by email:", error);
      throw new Error("Failed to find client by email.");
    }
  }

  async findParticularClients(): Promise<ParticularClient[]> {
    try {
      const data = await ClientModel.findAll({ where: { clientType: "particulier" } });
      return data.map(row => this.mapToEntity(row.toJSON()) as ParticularClient);
    } catch (error) {
      console.error("Error fetching particular clients:", error);
      throw new Error("Failed to fetch particular clients.");
    }
  }

  async findBusinessClients(): Promise<BusinessClient[]> {
    try {
      const data = await ClientModel.findAll({ where: { clientType: "entreprise" } });
      return data.map(row => this.mapToEntity(row.toJSON()) as BusinessClient);
    } catch (error) {
      console.error("Error fetching business clients:", error);
      throw new Error("Failed to fetch business clients.");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await ClientModel.destroy({ where: { id } });
    } catch (error) {
      console.error("Error deleting client:", error);
      throw new Error("Failed to delete client.");
    }
  }

  private mapToEntity(data: any): Client {
    if (data.clientType === "particulier") {
      return new ParticularClient(
        data.id, data.firstName, data.lastName,
        data.email, data.telephone, data.adresse, data.createdAt
      );
    }
    return new BusinessClient(
      data.id, data.companyName, data.nif, data.stat,
      data.email, data.telephone, data.adresse, data.createdAt
    );
  }
}
