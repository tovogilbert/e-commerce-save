export interface BrandResponseDTO {
  "id": number;
  "name": string;
  "createdAt": Date;
  "updatedAt": Date;
}

export interface BrandListResponseDTO {
  "brands": BrandResponseDTO[];
  "total": number;
}