import { Brand } from "../../core/entities/product/Brand";

export interface IBrandRepository {

  // Lister tous les marques
  findAll(): Promise<Brand[]>;

  // Enregistrer 
  save(brand: Brand): Promise<void>;

  // Trouver  par son identifiant
  findById(id: number): Promise<Brand | null>;

  // Trouver un par son nom
  findByName(name: string): Promise<Brand[]>;

  // Supprimer 
  delete(id: number): Promise<void>;

  // Mettre à jour 
  update(product: Brand): Promise<void>;

}
