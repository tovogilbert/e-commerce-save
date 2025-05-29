import { IBrandRepository } from "../../../interfaces/repositories/IBrandRepository";
import { Brand } from "../../entities/product/Brand";
import { BusinessError } from "../../../shared/errors/BusinessError";

export class GetBrandById {
  constructor(private readonly brandRepository: IBrandRepository) {}
  async execute(id: number): Promise<Brand> {
    const brand = await this.brandRepository.findById(id);
    if (!brand) throw new BusinessError("Marque introuvable.");
    return brand;
  }
}