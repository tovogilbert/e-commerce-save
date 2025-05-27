import { IBrandRepository } from "../../../interfaces/repositories/IBrandRepository";
import { Brand } from "../../entities/product/Brand";
import { ProductValidator } from "../../validations/ProductValidator";
import { BusinessError } from "../../../shared/errors/BusinessError";


export class UpdateBrand {
  constructor(private readonly brandRepository: IBrandRepository) {}
  async execute(data: Brand): Promise<void> {
    ProductValidator.validateBrand(data);
    
    const existing = await this.brandRepository.findById(data.id);
    if (!existing) throw new BusinessError("Marque à mettre à jour introuvable.");
    await this.brandRepository.update(data);
  }
}