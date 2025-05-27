import { IProductRepository } from '../../../interfaces/repositories/IProductRepository';
import { Product } from '../../entities/product/Product';
import { ProductValidator } from '../../validations/ProductValidator';
import { BusinessError } from '../../../shared/errors/BusinessError';

export class UpdateProduct {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(id: number, data: Partial<Product>): Promise<void> {
    const existing = await this.productRepo.findById(id);
    if (!existing) {
      throw new BusinessError(`Produit avec ID ${id} introuvable.`);
    }

    ProductValidator.validateProduct(data);

    const updated = new Product(
      id,
      data.name ?? existing.name,
      data.description ?? existing.description,
      data.priceExclTax ?? existing.priceExclTax,
      data.brand ?? existing.brand,
      data.stockQty ?? existing.stockQty,
      data.image ?? existing.image,
      data.features ?? existing.features
    );

    await this.productRepo.update(updated);
  }
}
