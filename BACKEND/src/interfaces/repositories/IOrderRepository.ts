import { Order } from "../../core/entities/orders/Order";

export interface IOrderRepository {
  //Enregistrement 
  save(order: Order): Promise<void>;

  // Trouver par son identifiant
  findById(id: number): Promise<Order | null>;

  // Suppression
  delete(id: number): Promise<void>;

  // Inclure les lignes de commande et leurs produits
  findWithLines(orderId: number): Promise<Order | null>;

  // Récupérer toutes les commandes d’un client
  findByClient(clientId: string): Promise<Order[]>;
}
