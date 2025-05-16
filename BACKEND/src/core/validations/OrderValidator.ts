import { OrderSchemas } from './shemas/OrderSchemas';
import { BusinessError } from '../../shared/errors/BusinessError';
import { Order } from '../entities/orders/Order';

export class OrderValidator {
  static validate(data: Partial<Order>): void {
    try {
      OrderSchemas.base.validateSync(data, { abortEarly: false });
    } catch (err) {
      throw new BusinessError(this.formatErrors(err));
    }
  }

  private static formatErrors(err: any): string {
    return err.errors.join(', ');
  }
}
  