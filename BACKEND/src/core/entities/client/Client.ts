export abstract class Client {
  constructor(
    public readonly id: string,
    public email: string,
    public telephone: string,
    public adresse: string,
    public readonly createdAt: Date = new Date()
  ) {}

  abstract getClientType(): string;
}
