export interface PaymentResponseDTO {
  "id": number;
  "paymentDate": Date;
  "amount": number;
  "method": string;
  "transactionRef": string;
  "createdAt": Date;
  "updatedAt": Date;
}

export interface PaymentListResponseDTO {
  "payments": PaymentResponseDTO[];
  "total": number;
}