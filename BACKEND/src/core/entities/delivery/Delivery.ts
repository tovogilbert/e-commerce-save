import { Order } from "../orders/Order";

export class Delivery {
  constructor(
    public readonly id: number,
    public order: Order,
    public mode: string,
    public deliveryPersonName: string,
    public deliveryDate: Date = new Date()
  ) {}
}