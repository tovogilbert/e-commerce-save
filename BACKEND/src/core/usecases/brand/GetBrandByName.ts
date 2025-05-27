import { IBrandRepository } from "../../../interfaces/repositories/IBrandRepository";
import { Brand } from "../../entities/product/Brand";
import { BusinessError } from "../../../shared/errors/BusinessError";

export class GetBrandByName {
  constructor(private readonly brandRepository: IBrandRepository) {}

  async execute(name: string): Promise<Brand> {
    const brands = await this.brandRepository.findByName(name);
    
    if (!brands || brands.length === 0) {
      throw new BusinessError("Marque introuvable.");
    }
    // Si plusieurs marques ont le même nom, on retourne la première trouvée
    return brands[0];
  }
}
