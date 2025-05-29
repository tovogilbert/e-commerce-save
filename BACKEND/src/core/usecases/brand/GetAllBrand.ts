import { IBrandRepository } from "../../../interfaces/repositories/IBrandRepository";
import { Brand } from "../../entities/product/Brand";
    
export class GetAllBrands {
  constructor(private readonly brandRepository: IBrandRepository) {}

  async execute(): Promise<Brand[]> {
    return this.brandRepository.findAll();
  }
}
