import { Client } from "../../core/entities/client/Client";
import { ParticularClient } from "../../core/entities/client/ParticularClient";
import { BusinessClient } from "../../core/entities/client/BusinessClient";

export interface IClientRepository {
  //Enregistrer un client 
  save(client: Client): Promise<void>;

  //Trouver un client par son identifiant 
  findById(id: string): Promise<Client | null>;

  //Supprimer un client par son identifiant 
  delete(id: string): Promise<void>;

  //Trouver un client par son e-mail
  findByEmail(email: string): Promise<Client | null>;

  //Trouver les clients particuliers 
  findParticularClients(): Promise<ParticularClient[]>;

  //Trouver les clients entreprises 
  findBusinessClients(): Promise<BusinessClient[]>;
}
