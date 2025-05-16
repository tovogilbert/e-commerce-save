import { Feature } from "../../core/entities/product/Feature";

export interface IFeatureRepository {
  //Enregistrement
  save(feature: Feature): Promise<void>;

  //Trouver un feature par son identifiant 
  findById(id: number): Promise<Feature | null>;

  //Liste 
  findAll(): Promise<Feature[]>;

  //Mettre à jour
  update(feature: Feature): Promise<void>;

  //Suppression 
  delete(id: number): Promise<void>;
}
