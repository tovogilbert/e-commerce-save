import { OrderLineModel } from "../../infrastructure/db/models/OrderLineModel";
import { OrderLine } from "../../core/entities/orders/OrderLine";
import { IOrderLineRepository } from "../../interfaces/repositories/IOrderLineRepository";
import { ProductModel } from "../../infrastructure/db/models/product/ProductModel";

export class OrderLineRepository implements IOrderLineRepository {
  async save(orderLine: OrderLine): Promise<OrderLine> {
    const [lineModel, created] = await OrderLineModel.upsert({
      idDetail: orderLine.idDetail,
      quantity: orderLine.quantity,
      unitPrice: orderLine.unitPrice,
      orderId: orderLine.orderId,
      productId: orderLine.product.id
    });

    const productModel = await ProductModel.findByPk(orderLine.product.id, { include: ['brand', 'features'] }) as any;
    if (!productModel) {
      throw new Error(`Product with id ${orderLine.product.id} not found`);
    }
    // Map ProductModel to Product entity
    const { Product } = await import("../../core/entities/product/Product");
    const { Brand } = await import("../../core/entities/product/Brand");
    const { ProductFeature } = await import("../../core/entities/product/ProductFeature");

    // If brand is missing, create a default Brand instance or handle accordingly
    const brand = productModel.brand
      ? new Brand(productModel.brand.id, productModel.brand.name)
      : new Brand(0, "Unknown");

    const features = productModel.features
      ? productModel.features.map((f: any) => new ProductFeature(f.id, f.name))
      : [];

    const product = new Product(
      productModel.id,
      productModel.name,
      productModel.description,
      productModel.priceExclTax,
      brand,
      productModel.stockQty,
      productModel.image,
      features
    );

    return new OrderLine(
      lineModel.idDetail,
      product,
      lineModel.quantity,
      lineModel.unitPrice
    );
  }

  async findById(idDetail: number): Promise<OrderLine | null> {
    const lineModel = await OrderLineModel.findByPk(idDetail, {
      include: [{ model: ProductModel, as: 'product' }]
    });

    if (!lineModel) return null;

    return new OrderLine(
      lineModel.idDetail,
      lineModel.product,
      lineModel.quantity,
      lineModel.unitPrice
    );
  }

  async findByOrder(orderId: number): Promise<OrderLine[]> {
    const lineModels = await OrderLineModel.findAll({ 
      where: { orderId },
      include: [{ model: ProductModel, as: 'product' }]
    });

    return lineModels.map(line => 
      new OrderLine(
        line.idDetail,
        line.product,
        line.quantity,
        line.unitPrice
      )
    );
  }

  async delete(idDetail: number): Promise<void> {
    await OrderLineModel.destroy({ where: { idDetail } });
  }

  async updateQuantity(idDetail: number, quantity: number): Promise<void> {
    await OrderLineModel.update({ quantity }, { where: { idDetail } });
  }
}