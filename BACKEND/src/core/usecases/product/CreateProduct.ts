import { Product } from '../../entities/product/Product';
import { IProductRepository } from '../../../interfaces/repositories/IProductRepository';
import { ProductValidator } from '../../validations/ProductValidator';
import { BusinessError } from '../../../shared/errors/BusinessError';
import { IBrandRepository } from '../../../interfaces/repositories/IBrandRepository';
import { IFeatureRepository } from '../../../interfaces/repositories/IFeatureRepository';
import { ProductFeature } from '../../entities/product/ProductFeature';

export class CreateProduct {
  constructor(
    private readonly productRepo: IProductRepository,
    private readonly brandRepo: IBrandRepository,
    private readonly featureRepo: IFeatureRepository
  ) {}

  async execute(data: {
    name: string;
    description: string;
    priceExclTax: number;
    brandId: number;
    stockQty: number;
    image: string;
    featureIds: number[];
  }): Promise<Product> {
    // Validation des données de base
    ProductValidator.validateProduct(data);

    // Vérification et récupération de la marque
    const brand = await this.brandRepo.findById(data.brandId);
    if (!brand) {
      throw new BusinessError("La marque spécifiée n'existe pas.", {
        errorCode: 'BRAND_NOT_FOUND'
      });
    }

    // Vérification et récupération des caractéristiques
    const features = await Promise.all(
      data.featureIds.map(async id => {
        const feature = await this.featureRepo.findById(id);
        if (!feature) {
          throw new BusinessError(`La caractéristique avec l'ID ${id} n'existe pas.`, {
            errorCode: 'FEATURE_NOT_FOUND'
          });
        }
        return feature;
      })
    );

    // Création de l'entité Product
    const product = new Product(
      0, 
      data.name,
      data.description,
      data.priceExclTax,
      brand,
      data.stockQty,
      data.image,
      features.map(f => new ProductFeature(0, f))
    );

    await this.productRepo.save(product);
    
    return product;
  }
}