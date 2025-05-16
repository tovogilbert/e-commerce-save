import { Client } from "./Client";

export class BusinessClient extends Client {
  constructor(
    id: string,
    public companyName: string,
    public nif: string,
    public stat: string,
    email: string,
    telephone: string,
    adresse: string,
    createdAt?: Date
  ) {
    super(id, email, telephone, adresse, createdAt);
  }

  getClientType(): string {
    return "entreprise";
  }
}
