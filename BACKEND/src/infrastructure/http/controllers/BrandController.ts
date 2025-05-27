import { Request, Response } from "express";
import { CreateBrandDTO, UpdateBrandDTO } from "../dtos/requests/brand.dto";
import { BrandRepository } from "../../repositories/BrandRepository";
import { CreateBrand} from "../../../core/usecases/brand/CreateBrand";
import { GetAllBrands } from "../../../core/usecases/brand/GetAllBrand";
import { GetBrandById } from "../../../core/usecases/brand/GetBrandById";
import { GetBrandByName } from "../../../core/usecases/brand/GetBrandByName";
import { UpdateBrand} from "../../../core/usecases/brand/UpdateBrand";
import { DeleteBrand } from "../../../core/usecases/brand/DeleteBrand";
import { BrandMapper } from "../mappers/BrandMapper";
import { BusinessError } from "../../../shared/errors/BusinessError";
import { ProductValidator } from "../../../core/validations/ProductValidator";
import { Brand } from "../../../core/entities/product/Brand";

const brandRepo = new BrandRepository();

export const createBrand = async (req: Request, res: Response) => {
  try {
    const dto: CreateBrandDTO = req.body;
    ProductValidator.validateBrand(dto);

    const useCase = new CreateBrand(brandRepo);
    await useCase.execute(dto);

    const getUseCase = new GetBrandByName(brandRepo);
    const brand = await getUseCase.execute(dto.name);
    
    return res.status(201).json(BrandMapper.toDTO(brand));
  } catch (err: any) {
    return res.status(400).json({ 
      error: err.message,
      ...(err instanceof BusinessError && { errorCode: err.errorCode })
    });
  }
};

export const getBrand = async (req: Request, res: Response) => {
  try {
    const useCase = new GetBrandById(brandRepo);
    const brand = await useCase.execute(Number(req.params.id));
    return res.json(BrandMapper.toDTO(brand));
  } catch (err: any) {
    return res.status(404).json({ 
      error: err.message,
      ...(err instanceof BusinessError && { errorCode: err.errorCode })
    });
  }
};

export const getAllBrands = async (req: Request, res: Response) => {
  try {
    const useCase = new GetAllBrands(brandRepo);
    const brands = await useCase.execute();
    return res.json(brands.map(BrandMapper.toDTO));
  } catch (err: any) {
    return res.status(500).json({ 
      error: err.message,
      ...(err instanceof BusinessError && { errorCode: err.errorCode })
    });
  }
};

export const getBrandByName = async (req: Request, res: Response) => {
  try {
    const useCase = new GetBrandByName(brandRepo);
    const brand = await useCase.execute(req.query.name as string);
    return res.json(BrandMapper.toDTO(brand));
  } catch (err: any) {
    return res.status(404).json({ 
      error: err.message,
      ...(err instanceof BusinessError && { errorCode: err.errorCode })
    });
  }
};

export const updateBrand = async (req: Request, res: Response) => {
  try {
    const dto: UpdateBrandDTO = {
      id: Number(req.params.id),
      name: req.body.name
    };
    ProductValidator.validateBrand(dto);

    const useCase = new UpdateBrand(brandRepo);
    await useCase.execute(new Brand(dto.id, dto.name));

    const getUseCase = new GetBrandById(brandRepo);
    const brand = await getUseCase.execute(dto.id);
    
    return res.json(BrandMapper.toDTO(brand));
  } catch (err: any) {
    const status = err instanceof BusinessError && err.errorCode === 'BRAND_NOT_FOUND' ? 404 : 400;
    return res.status(status).json({ 
      error: err.message,
      ...(err instanceof BusinessError && { errorCode: err.errorCode })
    });
  }
};

export const deleteBrand = async (req: Request, res: Response) => {
  try {
    const useCase = new DeleteBrand(brandRepo);
    await useCase.execute(Number(req.params.id));
    return res.status(204).send();
  } catch (err: any) {
    return res.status(404).json({ 
      error: err.message,
      ...(err instanceof BusinessError && { errorCode: err.errorCode })
    });
  }
};

export const searchBrands = async (req: Request, res: Response) => {
  try {
    const name = req.params.name; 
    
    if (!name || typeof name !== 'string') {
      throw new BusinessError("Le paramètre 'name' est requis et doit être une chaîne de caractères", {
        errorCode: 'VALIDATION_ERROR'
      });
    }

    const brands = await brandRepo.findByName(name);
    
    if (!brands.length) {
      throw new BusinessError("Aucune marque trouvée", {
        errorCode: 'BRAND_NOT_FOUND'
      });
    }
    
    return res.json(brands.map(BrandMapper.toDTO));
  } catch (err: any) {
    const status = err instanceof BusinessError && err.errorCode === 'BRAND_NOT_FOUND' ? 404 : 400;
    return res.status(status).json({ 
      error: err.message,
      ...(err instanceof BusinessError && { errorCode: err.errorCode })
    });
  }
};