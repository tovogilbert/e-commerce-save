import { IProductRepository } from '../../../interfaces/repositories/IProductRepository';

export class FindProductsByBrand {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(brandId: number) {
    return await this.productRepo.findByBrand(brandId);
  }
}
