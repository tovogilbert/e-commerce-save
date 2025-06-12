import { OrderModel } from "../../infrastructure/db/models/OrderModel";
import { OrderLineModel } from "../../infrastructure/db/models/OrderLineModel";
import { Order } from "../../core/entities/orders/Order";
import { OrderLine } from "../../core/entities/orders/OrderLine";
import { IOrderRepository } from "../../interfaces/repositories/IOrderRepository";
import { ClientModel } from "../../infrastructure/db/models/ClientModel";
import { PaymentModel } from "../../infrastructure/db/models/PaymentModel";
import { ProductModel } from "../../infrastructure/db/models/product/ProductModel";
import { BusinessError } from "../../shared/errors/BusinessError";

export class OrderRepository implements IOrderRepository {
  async save(order: Order): Promise<Order> {
    const transaction = await OrderModel.sequelize!.transaction();
    
    try {
      // Créer le paiement d'abord
      const payment = await PaymentModel.create({
        paymentDate: new Date(),
        amount: order.total,
        method: order.payment.method,
        transactionRef: `PAY-${Date.now()}`
      }, { transaction });

      // Créer la commande
      const orderModel = await OrderModel.create({
        orderDate: order.orderDate,
        status: order.status,
        deliveryAddress: order.deliveryAddress,
        shippingFee: order.shippingFee,
        subtotal: order.subtotal,
        discount: order.discount,
        tax: order.tax,
        total: order.total,
        clientId: Number(order.customer.id),
        paymentId: payment.id
      }, { transaction });

      // Créer les lignes de commande
      for (const line of order.lines) {
        await OrderLineModel.create({
          quantity: line.quantity,
          unitPrice: line.unitPrice,
          orderId: orderModel.id,
          productId: line.product.id
        }, { transaction });

        // Mettre à jour le stock du produit
        await ProductModel.decrement('stockQty', {
          by: line.quantity,
          where: { id: line.product.id },
          transaction
        });
      }

      await transaction.commit();
      
      // Retourner la commande avec l'ID généré
      return new Order(
        orderModel.id,
        order.customer,
        orderModel.orderDate,
        orderModel.status,
        orderModel.deliveryAddress,
        orderModel.shippingFee,
        order.lines,
        orderModel.subtotal,
        orderModel.discount,
        orderModel.tax,
        orderModel.total,
        order.payment
      );
    } catch (error) {
      await transaction.rollback();
      throw new BusinessError("Erreur lors de la création de la commande", {
        errorCode: "ORDER_SAVE_ERROR"        
      });
    }
  }

  async findById(id: number): Promise<Order | null> {
    const orderModel = await OrderModel.findByPk(id, {
      include: [
        { model: ClientModel, as: 'client' },
        { model: PaymentModel, as: 'payment' },
        { 
          model: OrderLineModel, 
          as: 'lines',
          include: [{ model: ProductModel, as: 'product' }]
        }
      ]
    });

    if (!orderModel) return null;

    return this.mapToDomain(orderModel);
  }

  async findWithLines(orderId: number): Promise<Order | null> {
    const orderModel = await OrderModel.findByPk(orderId, {
      include: [
        { model: ClientModel, as: 'client' },
        { model: PaymentModel, as: 'payment' },
        { 
          model: OrderLineModel, 
          as: 'lines',
          include: [{ model: ProductModel, as: 'product' }]
        }
      ]
    });

    if (!orderModel) return null;

    return this.mapToDomain(orderModel);
  }

  async findByClient(clientId: string): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      where: { clientId },
      include: [
        { model: PaymentModel, as: 'payment' },
        { model: OrderLineModel, as: 'lines' }
      ],
      order: [['orderDate', 'DESC']]
    });

    return orders.map(order => this.mapToDomain(order));
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: [
        { model: ClientModel, as: 'client' },
        { model: PaymentModel, as: 'payment' }
      ],
      order: [['orderDate', 'DESC']]
    });

    return orders.map(order => this.mapToDomain(order));
  }

  async delete(id: number): Promise<void> {
    const transaction = await OrderModel.sequelize!.transaction();
    
    try {
      const order = await OrderModel.findByPk(id, {
        include: [{ model: OrderLineModel, as: 'lines' }],
        transaction
      });

      if (!order) {
        throw new BusinessError("Commande non trouvée");
      }

      // Restaurer les stocks
      if (order.lines) {
        for (const line of order.lines) {
          await ProductModel.increment('stockQty', {
            by: line.quantity,
            where: { id: line.productId },
            transaction
          });
        }
      }

      // Supprimer les lignes de commande
      await OrderLineModel.destroy({
        where: { orderId: id },
        transaction
      });

      // Supprimer la commande
      await order.destroy({ transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  private mapToDomain(orderModel: OrderModel): Order {
    const lines = orderModel.lines?.map(line => 
      new OrderLine(
        line.idDetail,
        line.product,
        line.quantity,
        line.unitPrice
      )
    ) || [];

    return new Order(
      orderModel.id,
      orderModel.client,
      orderModel.orderDate,
      orderModel.status,
      orderModel.deliveryAddress,
      orderModel.shippingFee,
      lines,
      orderModel.subtotal,
      orderModel.discount,
      orderModel.tax,
      orderModel.total,
      orderModel.payment
    );
  }
}