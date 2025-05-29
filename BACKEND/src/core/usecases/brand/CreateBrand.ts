import { IBrandRepository } from "../../../interfaces/repositories/IBrandRepository";
import { Brand } from "../../entities/product/Brand";
import { ProductValidator } from "../../validations/ProductValidator";
import { BusinessError } from "../../../shared/errors/BusinessError";

export class CreateBrand {
  constructor(private readonly brandRepository: IBrandRepository) {}

  async execute(data: Partial<Brand>): Promise<void> {
    ProductValidator.validateBrand(data);

    const existing = await this.brandRepository.findByName(data.name!);
    if (existing.length > 0) {
      throw new BusinessError("Cette marque existe déjà.");
    }

    const brand = new Brand(0, data.name!); 
    await this.brandRepository.save(brand);
  }
}
