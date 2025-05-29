import { IProductRepository } from '../../../interfaces/repositories/IProductRepository';

export class FindProductByName {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(name: string) {
    try {
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        throw new Error('Invalid product name');
      }

      const product = await this.productRepo.findByName(name.trim());
      
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      console.error(`Error finding product by name "${name}":`, error);
      throw error;
    }
  }
}