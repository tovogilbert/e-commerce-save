import { IBrandRepository } from "../../../interfaces/repositories/IBrandRepository";
import { BusinessError } from "../../../shared/errors/BusinessError";

export class DeleteBrand {
  constructor(private readonly brandRepository: IBrandRepository) {}
  async execute(id: number): Promise<void> {
    
    const existing = await this.brandRepository.findById(id);
    if (!existing) throw new BusinessError("Marque à supprimer introuvable.");
    await this.brandRepository.delete(id);
  }
}