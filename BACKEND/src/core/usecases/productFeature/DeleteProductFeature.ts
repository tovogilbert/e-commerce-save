import { IProductFeatureRepository } from "../../../interfaces/repositories/IProductFeatureRepository";
import { BusinessError } from "../../../shared/errors/BusinessError";

export class DeleteProductFeature {
  constructor(private readonly productFeatureRepository: IProductFeatureRepository) {}
  
  async execute(id: number): Promise<void> {
    const pf = await this.productFeatureRepository.findById(id);
    if (!pf) throw new BusinessError("Association à supprimer introuvable.");
    await this.productFeatureRepository.delete(id);
  }
}
