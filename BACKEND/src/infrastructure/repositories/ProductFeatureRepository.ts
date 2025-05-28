import { IProductFeatureRepository } from "../../interfaces/repositories/IProductFeatureRepository";
import { ProductFeature } from "../../core/entities/product/ProductFeature";
import { Feature } from "../../core/entities/product/Feature";
import { ProductFeatureModel } from "../db/models/product/ProductFeatureModel";
import { FeatureModel } from "../db/models/product/FeatureModel";
import { BusinessError } from "../../shared/errors/BusinessError";

export class ProductFeatureRepository implements IProductFeatureRepository {
  async save(productFeature: ProductFeature): Promise<void> {
    try {
      await ProductFeatureModel.create({
        id: productFeature.id,
        featureId: productFeature.feature.id,
        productId: 0,
      });
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement du lien produit-caractéristique:",
        error
      );
      throw new BusinessError("Échec de l'enregistrement de l'association.");
    }
  }

  async findById(id: number): Promise<ProductFeature | null> {
    try {
      const row = await ProductFeatureModel.findByPk(id, {
        include: [FeatureModel],
      });
      if (!row || !row.featureId || !row.feature) return null;
      const feature = new Feature(row.feature.id, row.feature.name);
      return new ProductFeature(row.id, feature);
    } catch (error) {
      console.error("Erreur lors de la recherche de l'association:", error);
      throw new BusinessError(
        "Échec de la recherche de l'association produit-caractéristique."
      );
    }
  }

  async findAll(): Promise<ProductFeature[]> {
    try {
      const rows = await ProductFeatureModel.findAll({
        include: [FeatureModel],
      });
      return rows.map((row) => {
        const feature = new Feature(row.feature.id, row.feature.name);
        return new ProductFeature(row.id, feature);
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des associations:", error);
      throw new BusinessError(
        "Échec de la récupération des associations produit-caractéristique."
      );
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const deleted = await ProductFeatureModel.destroy({ where: { id } });
      if (!deleted)
        throw new BusinessError("Aucune association trouvée à supprimer.");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'association:", error);
      throw new BusinessError(
        "Échec de la suppression de l'association produit-caractéristique."
      );
    }
  }
}
