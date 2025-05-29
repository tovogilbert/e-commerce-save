import { IFeatureRepository } from "../../../interfaces/repositories/IFeatureRepository";
import { BusinessError } from "../../../shared/errors/BusinessError";


export class DeleteFeature {
  constructor(private readonly featureRepository: IFeatureRepository) {}

  async execute(id: number): Promise<void> {
    const existing = await this.featureRepository.findById(id);
    if (!existing) throw new BusinessError("Caractéristique à supprimer introuvable.");
    await this.featureRepository.delete(id);
  }
}