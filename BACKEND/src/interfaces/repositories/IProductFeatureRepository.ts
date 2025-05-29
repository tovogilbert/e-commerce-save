import { ProductFeature } from "../../core/entities/product/ProductFeature";

export interface IProductFeatureRepository {

  // Liste
  findAll(): Promise<ProductFeature[]>;

  // Enregistrer
  save(product: ProductFeature): Promise<void>;

  // Trouver un par son identifiant
  findById(id: number): Promise<ProductFeature | null>;

  // Suppression
  delete(id: number): Promise<void>;
}
