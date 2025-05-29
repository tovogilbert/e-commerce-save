export interface CreatePaymentDTO {
  'amount': number;
  'method': string;
  'transactionRef': string;
}

export interface UpdatePaymentDTO {
  'id': number;
  'amount'?: number;
  'method'?: string;
  'transactionRef'?: string;
}