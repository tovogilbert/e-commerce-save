import { IProductFeatureRepository } from "../../../interfaces/repositories/IProductFeatureRepository";
import { ProductFeature } from "../../entities/product/ProductFeature";
import { BusinessError } from "../../../shared/errors/BusinessError";

export class GetAllProductFeatures {
  constructor(private readonly productFeatureRepository: IProductFeatureRepository) {}
  
  async execute(): Promise<ProductFeature[]> {
    return this.productFeatureRepository.findAll();
  }
}