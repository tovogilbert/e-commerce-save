import { IProductFeatureRepository } from "../../../interfaces/repositories/IProductFeatureRepository";
import { ProductFeature } from "../../entities/product/ProductFeature";
import { BusinessError } from "../../../shared/errors/BusinessError";

export class CreateProductFeatureUseCase {
  constructor(private readonly productFeatureRepository: IProductFeatureRepository) {}

  async execute(data: ProductFeature): Promise<void> {
    if (!data.feature || !data.feature.id) {
      throw new BusinessError("Caractéristique invalide pour le produit.");
    }
    await this.productFeatureRepository.save(data);
  }
}