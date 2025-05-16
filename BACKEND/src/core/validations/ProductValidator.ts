import { ProductSchemas } from './shemas/ProductSchemas';
import { BusinessError } from '../../shared/errors/BusinessError';
import { Product } from '../entities/product/Product';
import { Brand } from '../entities/product/Brand';
import { Feature } from '../entities/product/Feature';

export class ProductValidator {
  static validateProduct(data: Partial<Product>): void {
    try {
      ProductSchemas.base.validateSync(data, { abortEarly: false });
    } catch (err) {
      throw new BusinessError(this.formatErrors(err));
    }
  }

  static validateBrand(data: Partial<Brand>): void {
    try {
      ProductSchemas.brand.validateSync(data, { abortEarly: false });
    } catch (err) {
      throw new BusinessError(this.formatErrors(err));
    }
  }

  static validateFeature(data: Partial<Feature>): void {
    try {
      ProductSchemas.feature.validateSync(data, { abortEarly: false });
    } catch (err) {
      throw new BusinessError(this.formatErrors(err));
    }
  }

  private static formatErrors(err: any): string {
    return err.errors.join(', ');
  }
}
