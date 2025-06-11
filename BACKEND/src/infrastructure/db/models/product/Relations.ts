import { ProductModel } from "./ProductModel";
import { BrandModel } from "./BrandModel";
import { FeatureModel } from "./FeatureModel";
import { ProductFeatureModel } from "./ProductFeatureModel";
import { OrderModel } from "../OrderModel";
import { OrderLineModel } from "../OrderLineModel";
import { ClientModel } from "../ClientModel";
import { PaymentModel } from "../PaymentModel";

export function setupRelations() {
  // Relation Product -> Brand
  ProductModel.belongsTo(BrandModel, {
    foreignKey: 'brandId',
    as: 'brand'
  });

  BrandModel.hasMany(ProductModel, {
    foreignKey: 'brandId'
  });

  // Relations pour ProductFeature
  ProductModel.hasMany(ProductFeatureModel, {
    foreignKey: 'productId',
    as: 'productFeatures'
  });

  ProductFeatureModel.belongsTo(ProductModel, {
    foreignKey: 'productId'
  });

  ProductFeatureModel.belongsTo(FeatureModel, {
    foreignKey: 'featureId',
    as: 'feature'
  });

  FeatureModel.hasMany(ProductFeatureModel, {
    foreignKey: 'featureId'
  });

  // Relations Order
  OrderModel.belongsTo(ClientModel, {
    foreignKey: 'clientId',
    as: 'client'
  });

  ClientModel.hasMany(OrderModel, {
    foreignKey: 'clientId'
  });

  OrderModel.belongsTo(PaymentModel, {
    foreignKey: 'paymentId',
    as: 'payment'
  });

  PaymentModel.hasOne(OrderModel, {
    foreignKey: 'paymentId'
  });

  // Relations OrderLine
  OrderModel.hasMany(OrderLineModel, {
    foreignKey: 'orderId',
    as: 'lines'
  });

  OrderLineModel.belongsTo(OrderModel, {
    foreignKey: 'orderId',
    as: 'order'
  });

  OrderLineModel.belongsTo(ProductModel, {
    foreignKey: 'productId',
    as: 'product'
  });

  ProductModel.hasMany(OrderLineModel, {
    foreignKey: 'productId'
  });
}