import { IProductRepository } from '../../../interfaces/repositories/IProductRepository';

export class GetProductsWithFeatures {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute() {
    try {
      const products = await this.productRepo.findWithFeatures();
      
      if (!products || products.length === 0) {
        throw new Error('No products found');
      }
      
      return products;
    } catch (error) {
      console.error('Error in GetProductsWithFeatures:', error);      
      throw error;
    }
  }
}