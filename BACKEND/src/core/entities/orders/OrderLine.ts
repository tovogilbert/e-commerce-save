import { Product } from "../product/Product";

export class OrderLine {
  orderId: any;
  constructor(
    public readonly idDetail: number,
    public product: Product,
    public quantity: number,
    public unitPrice: number
  
  ) {}
}