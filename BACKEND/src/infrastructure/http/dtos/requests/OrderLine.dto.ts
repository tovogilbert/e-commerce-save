export class OrderLine {
  constructor(
    public readonly productId: number,
    public readonly quantity: number,
    public readonly unitPrice: number
  ) {}
}

