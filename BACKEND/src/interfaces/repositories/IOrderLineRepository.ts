import { OrderLine } from "../../core/entities/orders/OrderLine";

export interface IOrderLineRepository {
  // Ajouter/mettre à jour une ligne de commande
  save(orderLine: OrderLine): Promise<OrderLine>;

  // Trouver une ligne par son ID
  findById(idDetail: number): Promise<OrderLine | null>;

  // Trouver toutes les lignes d'une commande
  findByOrder(orderId: number): Promise<OrderLine[]>;

  // Supprimer une ligne de commande
  delete(idDetail: number): Promise<void>;

  // Mettre à jour la quantité
  updateQuantity(idDetail: number, quantity: number): Promise<void>;
}