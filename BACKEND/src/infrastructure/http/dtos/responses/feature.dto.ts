export interface FeatureResponseDTO {
  "id": number;
  "name": string;
  "createdAt": Date;
  "updatedAt": Date;
}

export interface FeatureListResponseDTO {
  "features": FeatureResponseDTO[];
  "total": number;
}