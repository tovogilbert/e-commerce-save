import { IBrandRepository } from "../../interfaces/repositories/IBrandRepository";
import { Brand } from "../../core/entities/product/Brand";
import { BrandModel } from "../db/models/product/BrandModel";
import { BusinessError } from "../../shared/errors/BusinessError";
import { Op, UniqueConstraintError } from "sequelize";

export class BrandRepository implements IBrandRepository {
    private isSequelizeUniqueConstraintError(error: unknown): error is UniqueConstraintError {
        return (error as UniqueConstraintError).name === 'SequelizeUniqueConstraintError';
    }

    async findAll(): Promise<Brand[]> {
        try {
            const brandModels = await BrandModel.findAll();
            return brandModels.map(brandModel => 
                new Brand(brandModel.id, brandModel.name)
            );
        } catch (error: unknown) {
            console.error("Erreur lors de la récupération des marques :", error);
            throw new BusinessError("Impossible de récupérer la liste des marques", {
                errorCode: 'BRAND_FETCH_FAILED',
                details: [error instanceof Error ? error.message : 'Erreur inconnue']
            });
        }
    }

    async save(brand: Brand): Promise<void> {
        try {
            await BrandModel.create({
                name: brand.name
            });
        } catch (error: unknown) {
            console.error("Erreur lors de la création de la marque :", error);
            
            if (this.isSequelizeUniqueConstraintError(error)) {
                throw new BusinessError("Une marque avec ce nom existe déjà", {
                    errorCode: 'DUPLICATE_BRAND',
                    details: [`Le nom '${brand.name}' est déjà utilisé`]
                });
            }
            
            throw new BusinessError("Échec de la création de la marque", {
                errorCode: 'BRAND_CREATION_FAILED',
                details: [error instanceof Error ? error.message : 'Erreur inconnue']
            });
        }
    }

    async findById(id: number): Promise<Brand | null> {
        try {
            if (isNaN(id) || id <= 0) {
                throw new Error("L'ID doit être un nombre valide");
            }

            const brandModel = await BrandModel.findByPk(id);
            if (!brandModel) return null;
            
            return new Brand(brandModel.id, brandModel.name);
        } catch (error: unknown) {
            console.error(`Erreur lors de la recherche de la marque [ID: ${id}] :`, error);
            throw new BusinessError("Impossible de récupérer la marque", {
                errorCode: 'BRAND_FETCH_FAILED',
                details: [error instanceof Error ? error.message : 'Erreur inconnue']
            });
        }
    }

    async findByName(name: string): Promise<Brand[]> {
        try {
            if (!name || typeof name !== 'string') {
                throw new Error("Le nom doit être une chaîne de caractères valide");
            }

            const brandModels = await BrandModel.findAll({
                where: { 
                    name: {
                        [Op.iLike]: `%${name}%` 
                    }
                }
            });
            
            return brandModels.map(brandModel => 
                new Brand(brandModel.id, brandModel.name)
            );
        } catch (error: unknown) {
            console.error(`Erreur lors de la recherche de la marque [Nom: ${name}] :`, error);
            throw new BusinessError("Impossible de rechercher les marques", {
                errorCode: 'BRAND_SEARCH_FAILED',
                details: [error instanceof Error ? error.message : 'Erreur inconnue']
            });
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const deletedCount = await BrandModel.destroy({
                where: { id }
            });
            
            if (deletedCount === 0) {
                throw new BusinessError("Marque introuvable", {
                    errorCode: 'BRAND_NOT_FOUND',
                    details: [`Aucune marque avec l'ID ${id}`]
                });
            }
        } catch (error: unknown) {
            console.error(`Erreur lors de la suppression de la marque [ID: ${id}] :`, error);
            
            if (error instanceof BusinessError) throw error;
            
            throw new BusinessError("Échec de la suppression de la marque", {
                errorCode: 'BRAND_DELETION_FAILED',
                details: [error instanceof Error ? error.message : 'Erreur inconnue']
            });
        }
    }

    async update(brand: Brand): Promise<void> {
        try {
            const [updatedCount] = await BrandModel.update(
                { name: brand.name },
                { 
                    where: { id: brand.id },
                    individualHooks: true
                }
            );
            
            if (updatedCount === 0) {
                throw new BusinessError("Marque introuvable", {
                    errorCode: 'BRAND_NOT_FOUND',
                    details: [`Aucune marque avec l'ID ${brand.id}`]
                });
            }
        } catch (error: unknown) {
            console.error(`Erreur lors de la mise à jour de la marque [ID: ${brand.id}] :`, error);
            
            if (this.isSequelizeUniqueConstraintError(error)) {
                throw new BusinessError("Une marque avec ce nom existe déjà", {
                    errorCode: 'DUPLICATE_BRAND',
                    details: [`Le nom '${brand.name}' est déjà utilisé`]
                });
            }
            
            if (error instanceof BusinessError) throw error;
            
            throw new BusinessError("Échec de la mise à jour de la marque", {
                errorCode: 'BRAND_UPDATE_FAILED',
                details: [error instanceof Error ? error.message : 'Erreur inconnue']
            });
        }
    }
}