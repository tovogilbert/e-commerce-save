export interface ProductResponseDTO {
  "id": number;
  "name": string;
  "description": string;
  "priceExclTax": number;
  "stockQty": number;
  "image": string;
  "brand": {
    "id": number;
    "name": string;
  };
  "features": {
    "id": number;
    "name": string;
  }[];
  "createdAt": Date;
  "updatedAt": Date;
}

export interface ProductListResponseDTO {
  "products": ProductResponseDTO[];
  "total": number;
  "page": number;
}