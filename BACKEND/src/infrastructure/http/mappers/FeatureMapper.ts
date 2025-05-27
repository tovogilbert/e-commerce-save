import { FeatureResponseDTO } from "../dtos/responses/feature.dto";
import { Feature } from "../../../core/entities/product/Feature";

export class FeatureMapper {
  static toDTO(feature: Feature): FeatureResponseDTO {
    return {
      "id": feature.id,
      "name": feature.name,
      "createdAt": new Date(), 
      "updatedAt": new Date()  
    };
  }

  static toDTOList(features: Feature[]): FeatureResponseDTO[] {
    return features.map(feature => this.toDTO(feature));
  }
}