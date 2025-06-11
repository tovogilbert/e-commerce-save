import { IProductFeatureRepository } from "../../../interfaces/repositories/IProductFeatureRepository";
import { ProductFeature } from "../../entities/product/ProductFeature";

export class GetAllProductFeatures {
  constructor(private readonly productFeatureRepository: IProductFeatureRepository) {}
  
  async execute(): Promise<ProductFeature[]> {
    return this.productFeatureRepository.findAll();
  }
}