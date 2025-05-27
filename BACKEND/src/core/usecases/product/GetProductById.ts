import { IProductRepository } from '../../../interfaces/repositories/IProductRepository';
import { BusinessError } from '../../../shared/errors/BusinessError';

export class GetProductById {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(id: number) {
    const product = await this.productRepo.findById(id);
    if (!product) {
      throw new BusinessError(`Produit avec ID ${id} introuvable.`);
    }
    return product;
  }
}
