import { Product } from "../../core/entities/product/Product";

export interface IProductRepository {

  // Lister tous les produits
  findAll(): Promise<Product[]>;

  // Enregistrer un produit
  save(product: Product): Promise<void>;

  // Trouver un produit par son identifiant
  findById(id: number): Promise<Product | null>;

  // Trouver un produit par son nom
  findByName(name: string): Promise<Product[]>;

  // Supprimer un produit
  delete(id: number): Promise<void>;

  // Mettre à jour un produit
  update(product: Product): Promise<void>;

  // Récupérer les produits avec leurs features associés
  findWithFeatures(): Promise<Product[]>;

  // Rechercher les produits d’une marque donnée
  findByBrand(id: number): Promise<Product[]>;
}
