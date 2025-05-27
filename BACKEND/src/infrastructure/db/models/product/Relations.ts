import { ProductModel } from "./ProductModel";
import { BrandModel } from "./BrandModel";
import { FeatureModel } from "./FeatureModel";
import { ProductFeatureModel } from "./ProductFeatureModel";

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
}