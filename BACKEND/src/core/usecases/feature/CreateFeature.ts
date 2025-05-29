import { IFeatureRepository } from "../../../interfaces/repositories/IFeatureRepository";
import { Feature } from "../../entities/product/Feature";
import { ProductValidator } from "../../validations/ProductValidator";
import { BusinessError } from "../../../shared/errors/BusinessError";

export class CreateFeature {
  constructor(private readonly featureRepository: IFeatureRepository) {}

  async execute(data: Partial<Feature>): Promise<void> {
    ProductValidator.validateFeature(data);

    const features = await this.featureRepository.findAll();
    if (features.some(f => f.name.toLowerCase() === data.name!.toLowerCase())) {
      throw new BusinessError("Cette caractéristique existe déjà.");
    }

    const feature = new Feature(0, data.name!);
    await this.featureRepository.save(feature);
  }
}
