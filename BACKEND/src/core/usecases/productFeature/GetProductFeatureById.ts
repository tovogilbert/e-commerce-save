import { IProductFeatureRepository } from "../../../interfaces/repositories/IProductFeatureRepository";
import { ProductFeature } from "../../entities/product/ProductFeature";
import { BusinessError } from "../../../shared/errors/BusinessError";

export class GetProductFeatureById {
  constructor(private readonly productFeatureRepository: IProductFeatureRepository) {}
  
  async execute(id: number): Promise<ProductFeature> {
    const pf = await this.productFeatureRepository.findById(id);
    if (!pf) throw new BusinessError("Association produit/caractéristique introuvable.");
    return pf;
  }
}