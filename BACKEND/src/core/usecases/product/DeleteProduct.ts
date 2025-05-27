import { IProductRepository } from '../../../interfaces/repositories/IProductRepository';
import { BusinessError } from '../../../shared/errors/BusinessError';

export class DeleteProduct {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(id: number): Promise<void> {
    const existing = await this.productRepo.findById(id);
    if (!existing) {
      throw new BusinessError(`Produit avec ID ${id} introuvable.`);
    }
    await this.productRepo.delete(id);
  }
}
