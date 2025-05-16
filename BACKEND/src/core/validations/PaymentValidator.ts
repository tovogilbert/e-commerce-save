import { PaymentSchemas } from './shemas/PaymentSchemas';
import { BusinessError } from '../../shared/errors/BusinessError';
import { Payment } from '../entities/payment/Payment';

export class PaymentValidator {
  static validate(data: Partial<Payment>): void {
    try {
      PaymentSchemas.base.validateSync(data, { abortEarly: false });
    } catch (err) {
      throw new BusinessError(this.formatErrors(err));
    }
  }

  private static formatErrors(err: any): string {
    return err.errors.join(', ');
  }
}
