export class OrderLine {
  constructor(
    public readonly id: number,
    public readonly productId: number,
    public readonly productName: string,
    public readonly quantity: number,
    public readonly unitPrice: number,
    public readonly lineTotal: number
  ) {}
}