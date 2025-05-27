import { BrandResponseDTO } from "../dtos/responses/brand.dto";
import { Brand } from "../../../core/entities/product/Brand";

export class BrandMapper {
  static toDTO(brand: Brand): BrandResponseDTO {
    return {
      "id": brand.id,
      "name": brand.name,
      "createdAt": new Date(),
      "updatedAt": new Date()
    };
  }

  static toDTOList(brands: Brand[]): BrandResponseDTO[] {
    return brands.map(brand => this.toDTO(brand));
  }
}