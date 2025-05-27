export interface CreateProductDTO {
  "name": string;
  "description": string;
  "priceExclTax": number;
  "brandId": number;
  "stockQty": number;
  "image": string;
  "featureIds": number[]; 
}

export interface UpdateProductDTO {
  "id": number;
  "name"?: string;
  "description": string;
  "priceExclTax": number;
  "brandId": number;
  "stockQty": number;
  "image": string;
  "featureIds"?: number[];
}