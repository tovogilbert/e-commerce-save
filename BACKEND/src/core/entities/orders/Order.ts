import { Client } from '../client/Client';
import { Payment } from '../payment/Payment';
import { OrderLine } from './OrderLine';

export class Order {
  constructor(
    public readonly id: number,
    public customer: Client,
    public orderDate: Date = new Date(),
    public status: string,
    public deliveryAddress: string,
    public shippingFee: number,
    public lines: OrderLine[] = [],
    public subtotal: number,
    public discount: number,
    public tax: number,
    public total: number,
    public payment: Payment
  ) {}
}
