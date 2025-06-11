import { Order } from "../../core/entities/orders/Order";

export interface IOrderRepository {
  // Change return type from Promise<void> to Promise<Order>
  save(order: Order): Promise<Order>;

  // Trouver par son identifiant
  findById(id: number): Promise<Order | null>;

  // Suppression
  delete(id: number): Promise<void>;

  // Inclure les lignes de commande et leurs produits
  findWithLines(orderId: number): Promise<Order | null>;

  // Récupérer toutes les commandes d'un client
  findByClient(clientId: string): Promise<Order[]>;

  // Récupérer toutes les commandes
  findAll(): Promise<Order[]>;
}