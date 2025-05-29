import { ProductFeatureResponseDTO } from "../dtos/responses/productFeature.dto";
import { ProductFeature } from "../../../core/entities/product/ProductFeature";
import { Product } from "../../../core/entities/product/Product";


export class ProductFeatureMapper {
  static toDTO(pf: ProductFeature, p: Product): ProductFeatureResponseDTO {
    return {
      "id": pf.id,
      "productId": p.id,
      "feature": {
        "id": pf.feature.id,
        "name": pf.feature.name
      }
    };
  }

  static toDTOList(pfs: ProductFeature[], p: Product): ProductFeatureResponseDTO[] {
    return pfs.map(pf => this.toDTO(pf, p));
  }
}