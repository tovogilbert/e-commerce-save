import { IProductRepository } from '../../../interfaces/repositories/IProductRepository';

export class ListProducts {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute() {
    try {
      const products = await this.productRepo.findAll();
     // console.log("Liste des produits dans la base de données : ",  products);      
      if (!products) {
        throw new Error('Products list returned null or undefined');
      }
      return products
    } catch (error) {
      console.error('Error in ListProducts.execute:', error);
    }
  }
}