import { IProductRepository } from "../../interfaces/repositories/IProductRepository";
import { Product } from "../../core/entities/product/Product";
import { Brand } from "../../core/entities/product/Brand";
import { Feature } from "../../core/entities/product/Feature";
import { ProductFeature } from "../../core/entities/product/ProductFeature";
import { ProductModel } from "../db/models/product/ProductModel";
import { BrandModel } from "../db/models/product/BrandModel";
import { FeatureModel } from "../db/models/product/FeatureModel";
import { ProductFeatureModel } from "../db/models/product/ProductFeatureModel";
import { BusinessError } from "../../shared/errors/BusinessError";
import { UniqueConstraintError, Transaction } from "sequelize";

export class ProductRepository implements IProductRepository {
  private async createProductFeatures(
    productId: number, 
    features: Feature[], 
    transaction?: Transaction
  ): Promise<ProductFeature[]> {
    return Promise.all(
      features.map(async feature => {
        const productFeature = await ProductFeatureModel.create({
          productId,
          featureId: feature.id
        }, { transaction });
        
        return new ProductFeature(
          productFeature.id,
          feature
        );
      })
    );
  }

  async save(product: Product): Promise<void> {
    const transaction = await ProductModel.sequelize!.transaction();
    
    try {
      // 1. Créer le produit de base
      const productModel = await ProductModel.create({
        "name": product.name,
        "description": product.description,
        "priceExclTax": product.priceExclTax,
        "stockQty": product.stockQty,
        "image": product.image,
        "brandId": product.brand.id
      }, { transaction });

      // 2. Créer les associations de caractéristiques
      if (product.features.length > 0) {
        await this.createProductFeatures(
          productModel.id, 
          product.features.map(pf => pf.feature),
          transaction
        );
      }

      await transaction.commit();
    } catch (error: unknown) {
      await transaction.rollback();
      console.error("Erreur création produit:", error);
      
      if (error instanceof UniqueConstraintError) {
        throw new BusinessError("Un produit similaire existe déjà", {
          errorCode: 'DUPLICATE_PRODUCT',
          details: ["Vérifiez le nom et les caractéristiques"]
        });
      }
      
      throw new BusinessError("Échec de la création du produit", {
        errorCode: 'PRODUCT_CREATION_FAILED',
        details: [error instanceof Error ? error.message : 'Erreur inconnue']
      });
    }
  }

  async findById(id: number): Promise<Product | null> {
  try {
    const productModel = await ProductModel.findByPk(id, {
      include: [
        { 
          model: BrandModel,
          as: 'brand'
        },
        {
          model: ProductFeatureModel,
          as: 'productFeatures',
          include: [{
            model: FeatureModel,
            as: 'feature'
          }]
        }
      ]
    });

    if (!productModel) return null;

    return new Product(
      productModel.id,
      productModel.name,
      productModel.description,
      productModel.priceExclTax,
      new Brand(
        productModel.brand.id,
        productModel.brand.name
      ),
      productModel.stockQty,
      productModel.image,
      productModel.productFeatures?.map(pf => 
        new ProductFeature(
          pf.id,
          new Feature(pf.feature.id, pf.feature.name)
        )
      ) || []
    );
  } catch (error: unknown) {
      console.error(`Erreur recherche produit [ID: ${id}]:`, error);
      throw new BusinessError("Impossible de récupérer le produit", {
        errorCode: 'PRODUCT_FETCH_FAILED',
        details: [error instanceof Error ? error.message : 'Erreur inconnue']
      });
    }
  }

  async findAll(): Promise<Product[]> {
  try {
    const productModels = await ProductModel.findAll({
      include: [
        { 
          model: BrandModel,
          as: 'brand'
        },
        {
          model: ProductFeatureModel,
          as: 'productFeatures',
          include: [{
            model: FeatureModel,
            as: 'feature'
          }]
        }
      ]
    });

    return productModels.map(pm => 
      new Product(
        pm.id,
        pm.name,
        pm.description,
        pm.priceExclTax,
        new Brand(pm.brand.id, pm.brand.name),
        pm.stockQty,
        pm.image,
        pm.productFeatures?.map(pf => 
          new ProductFeature(
            pf.id,
            new Feature(pf.feature.id, pf.feature.name)
          )
        ) || []
      )
    );
  } catch (error: unknown) {
    console.error("Erreur récupération produits:", error);
    throw new BusinessError("Impossible de lister les produits", {
      errorCode: 'PRODUCT_FETCH_ALL_FAILED',
      details: [error instanceof Error ? error.message : 'Erreur inconnue']
    });
  }
}

  async update(product: Product): Promise<void> {
    const transaction = await ProductModel.sequelize!.transaction();
    
    try {
      // 1. Mettre à jour le produit de base
      const [updatedCount] = await ProductModel.update(
        {
          "name": product.name,
          "description": product.description,
          "priceExclTax": product.priceExclTax,
          "stockQty": product.stockQty,
          "image": product.image,
          "brandId": product.brand.id
        },
        { 
          where: { id: product.id },
          transaction
        }
      );

      if (updatedCount === 0) {
        throw new BusinessError("Produit introuvable", {
          errorCode: 'PRODUCT_NOT_FOUND'
        });
      }

      // 2. Mettre à jour les caractéristiques
      await ProductFeatureModel.destroy({
        where: { productId: product.id },
        transaction
      });

      if (product.features.length > 0) {
        await this.createProductFeatures(
          product.id,
          product.features.map(pf => pf.feature),
          transaction
        );
      }

      await transaction.commit();
    } catch (error: unknown) {
      await transaction.rollback();
      console.error(`Erreur mise à jour produit [ID: ${product.id}]:`, error);
      
      if (error instanceof BusinessError) throw error;
      
      if (error instanceof UniqueConstraintError) {
        throw new BusinessError("Conflit de données produit", {
          errorCode: 'DUPLICATE_PRODUCT'
        });
      }
      
      throw new BusinessError("Échec de la mise à jour du produit", {
        errorCode: 'PRODUCT_UPDATE_FAILED'
      });
    }
  }

  async delete(id: number): Promise<void> {
    const transaction = await ProductModel.sequelize!.transaction();
    
    try {
      await ProductFeatureModel.destroy({
        where: { productId: id },
        transaction
      });

      const deletedCount = await ProductModel.destroy({
        where: { id },
        transaction
      });

      if (deletedCount === 0) {
        throw new BusinessError("Produit introuvable", {
          errorCode: 'PRODUCT_NOT_FOUND'
        });
      }

      await transaction.commit();
    } catch (error: unknown) {
      await transaction.rollback();
      console.error(`Erreur suppression produit [ID: ${id}]:`, error);
      
      if (error instanceof BusinessError) throw error;
      
      throw new BusinessError("Échec de la suppression du produit", {
        errorCode: 'PRODUCT_DELETION_FAILED'
      });
    }
  }

  // --- Methods required by IProductRepository interface ---
async findByName(name: string): Promise<Product[]> {
  try {
    const productModels = await ProductModel.findAll({
      where: { name },
      include: [
        {
          model: BrandModel,
          as: 'brand',
          attributes: ['id', 'name']
        },
        {
          model: ProductFeatureModel,
          as: 'productFeatures',
          include: [{
            model: FeatureModel,
            as: 'feature',
            attributes: ['id', 'name']
          }]
        }
      ]
    });

    return productModels.map(productModel => {
      const productFeatures = productModel.productFeatures?.map(pf => {
        return new ProductFeature(
          pf.id,
          new Feature(pf.feature.id, pf.feature.name)
        );
      }) || [];

      return new Product(
        productModel.id,
        productModel.name,
        productModel.description,
        productModel.priceExclTax,
        new Brand(
          productModel.brand.id,
          productModel.brand.name
        ),
        productModel.stockQty,
        productModel.image,
        productFeatures
      );
    });
  } catch (error: unknown) {
    console.error(`Erreur recherche produit par nom [${name}]:`, error);
    throw new BusinessError("Impossible de récupérer le produit par nom", {
      errorCode: 'PRODUCT_FETCH_BY_NAME_FAILED',
      details: [error instanceof Error ? error.message : 'Erreur inconnue']
    });
  }
}

  async findWithFeatures(featureIds?: number[]): Promise<Product[]> {
    try {
      const includeOptions: any[] = [
        { model: BrandModel, as: 'brand' },
        { 
          model: ProductFeatureModel,
          required: !!(featureIds && featureIds.length > 0),
          ...(featureIds && featureIds.length > 0
            ? { where: { featureId: featureIds } }
            : {}),
          include: [FeatureModel]
        }
      ];

      const productModels = await ProductModel.findAll({
        include: includeOptions
      });

      return productModels.map(pm => 
        new Product(
          pm.id,
          pm.name,
          pm.description,
          pm.priceExclTax,
          new Brand(pm.brand.id, pm.brand.name),
          pm.stockQty,
          pm.image,
          pm.productFeatures?.map(pf => 
            new ProductFeature(
              pf.id,
              new Feature(pf.feature.id, pf.feature.name)
            )
          ) || []
        )
      );
    } catch (error: unknown) {
      console.error("Erreur recherche produits par caractéristiques:", error);
      throw new BusinessError("Impossible de récupérer les produits par caractéristiques", {
        errorCode: 'PRODUCT_FETCH_BY_FEATURES_FAILED',
        details: [error instanceof Error ? error.message : 'Erreur inconnue']
      });
    }
  }

  async findByBrand(brandId: number): Promise<Product[]> {
    try {
      const productModels = await ProductModel.findAll({
        where: { brandId },
        include: [
          { model: BrandModel, as: 'brand' },
          { 
            model: ProductFeatureModel,
            include: [FeatureModel]
          }
        ]
      });

      return productModels.map(pm => 
        new Product(
          pm.id,
          pm.name,
          pm.description,
          pm.priceExclTax,
          new Brand(pm.brand.id, pm.brand.name),
          pm.stockQty,
          pm.image,
          pm.productFeatures?.map(pf => 
            new ProductFeature(
              pf.id,
              new Feature(pf.feature.id, pf.feature.name)
            )
          ) || []
        )
      );
    } catch (error: unknown) {
      console.error(`Erreur recherche produits par marque [ID: ${brandId}]:`, error);
      throw new BusinessError("Impossible de récupérer les produits par marque", {
        errorCode: 'PRODUCT_FETCH_BY_BRAND_FAILED',
        details: [error instanceof Error ? error.message : 'Erreur inconnue']
      });
    }
  }
}