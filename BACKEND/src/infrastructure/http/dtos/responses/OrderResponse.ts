import { ClientResponseDTO } from "./ClientResponse.dto";
import { PaymentResponseDTO } from "./payment.dto";
import { OrderLine } from "./OrderLine";

export class OrderResponse {
  constructor(
    public readonly id: number,
    public readonly customer: ClientResponse,
    public readonly orderDate: Date,
    public readonly status: string,
    public readonly deliveryAddress: string,
    public readonly shippingFee: number,
    public readonly lines: OrderLine[],
    public readonly subtotal: number,
    public readonly discount: number,
    public readonly tax: number,
    public readonly total: number,
    public readonly payment: PaymentResponse
  ) {}
}

export interface ClientResponse {
  id: string;
  email: string;
  telephone: string;
  adresse: string;
  type: 'particulier' | 'entreprise';
  firstName?: string;
  lastName?: string;
  companyName?: string;
  nif?: string;
}

