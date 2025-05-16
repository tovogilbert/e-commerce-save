import { Client } from "./Client";

export class ParticularClient extends Client {
  constructor(
    id: string,
    public firstName: string,
    public lastName: string,
    email: string,
    telephone: string,
    adresse: string,
    createdAt?: Date
  ) {
    super(id, email, telephone, adresse, createdAt);
  }

  getClientType(): string {
    return "particulier";
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
