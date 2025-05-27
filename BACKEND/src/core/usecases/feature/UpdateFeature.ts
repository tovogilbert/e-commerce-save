import { IFeatureRepository } from "../../../interfaces/repositories/IFeatureRepository";
import { Feature } from "../../entities/product/Feature";
import { ProductValidator } from "../../validations/ProductValidator";
import { BusinessError } from "../../../shared/errors/BusinessError";

export class UpdateFeature {
  constructor(private readonly featureRepository: IFeatureRepository) {}

  async execute(data: Feature): Promise<void> {
    ProductValidator.validateFeature(data);
    const existing = await this.featureRepository.findById(data.id);
    if (!existing) throw new BusinessError("Caractéristique à mettre à jour introuvable.");
    await this.featureRepository.update(data);
  }
}

