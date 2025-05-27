import { IFeatureRepository } from "../../../interfaces/repositories/IFeatureRepository";
import { Feature } from "../../entities/product/Feature";

export class GetAllFeatures {
  constructor(private readonly featureRepository: IFeatureRepository) {}
  async execute(): Promise<Feature[]> {
    return this.featureRepository.findAll();
  }
}