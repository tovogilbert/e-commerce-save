import { ProductResponseDTO, ProductListResponseDTO } from "../dtos/responses/product.dto";
import { Product } from "../../../core/entities/product/Product";
import { ProductFeature } from "../../../core/entities/product/ProductFeature";

export class ProductMapper {
  static toDTO(product: Product): ProductResponseDTO {
    return {
      "id": product.id,
      "name": product.name,
      "description": product.description,
      "priceExclTax": product.priceExclTax,
      "stockQty": product.stockQty,
      "image": product.image,
      "brand": {
        "id": product.brand.id,
        "name": product.brand.name
      },
      "features": product.features.map(feature => ({
        "id": feature.id,
        "name": feature.feature.name
      })),
      "createdAt": new Date(),
      "updatedAt": new Date()
    };
  }

  static toListDTO(products: Product[], total: number, page: number = 1): ProductListResponseDTO {
    return {
      "products": products.map(product => this.toDTO(product)),
      "total": total,
      "page": page
    };
  }

  static toDetailsDTO(product: Product): ProductResponseDTO {
    const baseDTO = this.toDTO(product);
        return {
      ...baseDTO,
    };
  }
}