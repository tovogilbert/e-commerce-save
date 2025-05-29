import { Request, Response } from "express";
import { CreateFeatureDTO, UpdateFeatureDTO } from "../dtos/requests/feature.dto";
import { FeatureRepository } from "../../repositories/FeatureRepository";
import { CreateFeature } from "../../../core/usecases/feature/CreateFeature";
import { GetAllFeatures } from "../../../core/usecases/feature/GetAllFeatures";
import { GetFeatureById } from "../../../core/usecases/feature/GetFeatureById";
import { UpdateFeature } from "../../../core/usecases/feature/UpdateFeature";
import { DeleteFeature } from "../../../core/usecases/feature/DeleteFeature";
import { FeatureMapper } from "../mappers/FeatureMapper";
import { BusinessError } from "../../../shared/errors/BusinessError";
import { ProductValidator } from "../../../core/validations/ProductValidator";
import { Feature } from "../../../core/entities/product/Feature";

const featureRepo = new FeatureRepository();

export const createFeature = async (req: Request, res: Response) => {
  try {
    const dto: CreateFeatureDTO = req.body;
    ProductValidator.validateFeature(dto);

    const useCase = new CreateFeature(featureRepo);
    await useCase.execute(dto);

    const features = await featureRepo.findAll();
    const createdFeature = features.find(f => f.name === dto.name);
    
    if (!createdFeature) {
      throw new BusinessError("Erreur lors de la récupération de la caractéristique créée");
    }

    return res.status(201).json(FeatureMapper.toDTO(createdFeature));
  } catch (err: any) {
    return res.status(400).json({ 
      error: err.message,
      ...(err instanceof BusinessError && { errorCode: err.errorCode })
    });
  }
};

export const getFeature = async (req: Request, res: Response) => {
  try {
    const useCase = new GetFeatureById(featureRepo);
    const feature = await useCase.execute(Number(req.params.id));
    return res.json(FeatureMapper.toDTO(feature));
  } catch (err: any) {
    return res.status(404).json({ 
      error: err.message,
      ...(err instanceof BusinessError && { errorCode: err.errorCode })
    });
  }
};

export const getAllFeatures = async (req: Request, res: Response) => {
  try {
    const useCase = new GetAllFeatures(featureRepo);
    const features = await useCase.execute();
    return res.json(features.map(FeatureMapper.toDTO));
  } catch (err: any) {
    return res.status(500).json({ 
      error: err.message,
      ...(err instanceof BusinessError && { errorCode: err.errorCode })
    });
  }
};

export const updateFeature = async (req: Request, res: Response) => {
  try {
    const dto: UpdateFeatureDTO = {
      id: Number(req.params.id),
      name: req.body.name
    };
    ProductValidator.validateFeature(dto);

    const useCase = new UpdateFeature(featureRepo);
    await useCase.execute(new Feature(dto.id, dto.name));

    const updatedFeature = await featureRepo.findById(dto.id);
    if (!updatedFeature) {
      throw new BusinessError("Caractéristique introuvable après mise à jour");
    }
    
    return res.json(FeatureMapper.toDTO(updatedFeature));
  } catch (err: any) {
    const status = err instanceof BusinessError && err.errorCode === 'FEATURE_NOT_FOUND' ? 404 : 400;
    return res.status(status).json({ 
      error: err.message,
      ...(err instanceof BusinessError && { errorCode: err.errorCode })
    });
  }
};

export const deleteFeature = async (req: Request, res: Response) => {
  try {
    const useCase = new DeleteFeature(featureRepo);
    await useCase.execute(Number(req.params.id));
    return res.status(204).send();
  } catch (err: any) {
    return res.status(404).json({ 
      error: err.message,
      ...(err instanceof BusinessError && { errorCode: err.errorCode })
    });
  }
};
