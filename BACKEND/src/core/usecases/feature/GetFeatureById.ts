import { IFeatureRepository } from "../../../interfaces/repositories/IFeatureRepository";
import { Feature } from "../../entities/product/Feature";
import { BusinessError } from "../../../shared/errors/BusinessError";


export class GetFeatureById {
  constructor(private readonly featureRepository: IFeatureRepository) {}

  async execute(id: number): Promise<Feature> {
    const feature = await this.featureRepository.findById(id);
    if (!feature) throw new BusinessError("Caractéristique introuvable.");
    return feature;
  }
}