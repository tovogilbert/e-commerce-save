import { IFeatureRepository } from "../../interfaces/repositories/IFeatureRepository";
import { Feature } from "../../core/entities/product/Feature";
import { FeatureModel } from "../db/models/product/FeatureModel";
import { BusinessError } from "../../shared/errors/BusinessError";
import { UniqueConstraintError } from "sequelize";

export class FeatureRepository implements IFeatureRepository {
  private isSequelizeUniqueConstraintError(
    error: unknown
  ): error is UniqueConstraintError {
    return (
      (error as UniqueConstraintError).name === "SequelizeUniqueConstraintError"
    );
  }

  async save(feature: Feature): Promise<void> {
    try {
      await FeatureModel.create({
        name: feature.name,
      });
    } catch (error: unknown) {
      console.error(
        `Erreur création caractéristique [${feature.name}]:`,
        error
      );

      if (this.isSequelizeUniqueConstraintError(error)) {
        throw new BusinessError("Cette caractéristique existe déjà", {
          errorCode: "DUPLICATE_FEATURE",
          details: [`Le nom '${feature.name}' est déjà utilisé`],
        });
      }

      throw new BusinessError("Échec de la création de la caractéristique", {
        errorCode: "FEATURE_CREATION_FAILED",
        details: [error instanceof Error ? error.message : "Erreur inconnue"],
      });
    }
  }

  async findById(id: number): Promise<Feature | null> {
    try {
      const featureModel = await FeatureModel.findByPk(id);
      return featureModel
        ? new Feature(featureModel.id, featureModel.name)
        : null;
    } catch (error: unknown) {
      console.error(`Erreur recherche caractéristique [ID: ${id}]:`, error);
      throw new BusinessError("Impossible de récupérer la caractéristique", {
        errorCode: "FEATURE_FETCH_FAILED",
        details: [error instanceof Error ? error.message : "Erreur inconnue"],
      });
    }
  }

  async findAll(): Promise<Feature[]> {
    try {
      const featureModels = await FeatureModel.findAll();
      return featureModels.map((f) => new Feature(f.id, f.name));
    } catch (error: unknown) {
      console.error("Erreur récupération caractéristiques:", error);
      throw new BusinessError("Impossible de lister les caractéristiques", {
        errorCode: "FEATURE_FETCH_ALL_FAILED",
        details: [error instanceof Error ? error.message : "Erreur inconnue"],
      });
    }
  }

  async update(feature: Feature): Promise<void> {
    try {
      const [updatedCount] = await FeatureModel.update(
        { name: feature.name },
        {
          where: { id: feature.id },
          individualHooks: true, 
        }
      );

      if (updatedCount === 0) {
        throw new BusinessError("Caractéristique introuvable", {
          errorCode: "FEATURE_NOT_FOUND",
          details: [`ID ${feature.id} non trouvé`],
        });
      }
    } catch (error: unknown) {
      console.error(
        `Erreur mise à jour caractéristique [ID: ${feature.id}]:`,
        error
      );

      if (this.isSequelizeUniqueConstraintError(error)) {
        throw new BusinessError("Cette caractéristique existe déjà", {
          errorCode: "DUPLICATE_FEATURE",
          details: [`Le nom '${feature.name}' est déjà utilisé`],
        });
      }

      if (error instanceof BusinessError) throw error;

      throw new BusinessError("Échec de la mise à jour", {
        errorCode: "FEATURE_UPDATE_FAILED",
        details: [error instanceof Error ? error.message : "Erreur inconnue"],
      });
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const deletedCount = await FeatureModel.destroy({
        where: { id },
      });

      if (deletedCount === 0) {
        throw new BusinessError("Caractéristique introuvable", {
          errorCode: "FEATURE_NOT_FOUND",
          details: [`ID ${id} non trouvé`],
        });
      }
    } catch (error: unknown) {
      console.error(`Erreur suppression caractéristique [ID: ${id}]:`, error);

      if (error instanceof BusinessError) throw error;

      throw new BusinessError("Échec de la suppression", {
        errorCode: "FEATURE_DELETION_FAILED",
        details: [error instanceof Error ? error.message : "Erreur inconnue"],
      });
    }
  }
}
