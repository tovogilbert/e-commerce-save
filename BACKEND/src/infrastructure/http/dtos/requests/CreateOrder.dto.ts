import { OrderLine } from "./OrderLine.dto";

export class CreateOrder {
  constructor(
    public readonly clientId: number,
    public readonly deliveryAddress: string,
    public readonly shippingFee: number,
    public readonly discount: number,
    public readonly lines: OrderLine[],
    public readonly paymentMethod: string
  ) {}
}

