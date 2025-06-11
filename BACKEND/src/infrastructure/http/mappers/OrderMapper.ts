import { Order } from "../../../core/entities/orders/Order";
import { OrderLine } from "../../../core/entities/orders/OrderLine";
import { CreateOrder } from "../dtos/requests/CreateOrder.dto";
import { OrderResponse } from "../dtos/responses/OrderResponse";
import { Client } from "../../../core/entities/client/Client";
import { Payment } from "../../../core/entities/payment/Payment";
import { ParticularClient } from "../../../core/entities/client/ParticularClient";
import { BusinessClient } from "../../../core/entities/client/BusinessClient";
import { ClientResponseDTO } from "../dtos/responses/ClientResponse.dto";

export class OrderMapper {
  static toDomain(request: CreateOrder, client: Client): Order {
    const lines = request.lines.map(line => 
      new OrderLine(
        0, // ID temporaire
        { id: line.productId } as any, // Product partiel
        line.quantity,
        line.unitPrice
      )
    );

    return new Order(
      0, // ID temporaire
      client,
      new Date(),
      'pending',
      request.deliveryAddress,
      request.shippingFee,
      lines,
      0, // Calculé plus tard
      request.discount,
      0, // Calculé plus tard
      0, // Calculé plus tard
      { 
        id: 0, // ID temporaire
        paymentDate: new Date(),
        amount: 0, // Calculé plus tard
        method: request.paymentMethod,
        transactionRef: '' // Généré plus tard
      } as Payment
    );
  }

  static toResponse(order: Order): OrderResponse {
    let clientResponse: ClientResponseDTO;

    if (order.customer instanceof ParticularClient) {
      clientResponse = {
        id: order.customer.id,
        email: order.customer.email,
        telephone: order.customer.telephone,
        adresse: order.customer.adresse,
        createdAt: order.customer.createdAt,
        clientType: "particulier",
        firstName: order.customer.firstName,
        lastName: order.customer.lastName,
        fullName: order.customer.fullName
      };
    } else if (order.customer instanceof BusinessClient) {
      clientResponse = {
        id: order.customer.id,
        email: order.customer.email,
        telephone: order.customer.telephone,
        adresse: order.customer.adresse,
        createdAt: order.customer.createdAt,
        clientType: "entreprise",
        companyName: order.customer.companyName,
        nif: order.customer.nif,
        stat: order.customer.stat
      };
    } else {
      // Fallback pour un client générique
      clientResponse = {
        id: order.customer.id,
        email: order.customer.email,
        telephone: order.customer.telephone,
        adresse: order.customer.adresse,
        createdAt: order.customer.createdAt,
        clientType: "particulier" // Valeur par défaut
      };
    }

    return new OrderResponse(
      order.id,
      clientResponse,
      order.orderDate,
      order.status,
      order.deliveryAddress,
      order.shippingFee,
      order.lines.map(line => ({
        id: line.idDetail,
        productId: line.product.id,
        productName: line.product.name,
        quantity: line.quantity,
        unitPrice: line.unitPrice,
        lineTotal: line.unitPrice * line.quantity
      })),
      order.subtotal,
      order.discount,
      order.tax,
      order.total,
      {
        id: order.payment.id,
        method: order.payment.method,
        amount: order.payment.amount,
        status: order.payment.status || 'completed', // Valeur par défaut
        transactionDate: order.payment.paymentDate,
        transactionRef: order.payment.transactionRef
      }
    );
  }
}