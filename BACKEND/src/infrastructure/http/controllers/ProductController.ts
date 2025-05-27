import { Request, Response } from "express";
import { CreateProductDTO, UpdateProductDTO } from "../dtos/requests/product.dto";
import { ProductRepository } from "../../../infrastructure/repositories/ProductRepository";
import { CreateProduct} from "../../../core/usecases/product/CreateProduct";
import { ListProducts} from "../../../core/usecases/product/ListProducts";
import { GetProductById } from "../../../core/usecases/product/GetProductById";
import { FindProductByName } from "../../../core/usecases/product/FindProductByName";
import { FindProductsByBrand } from "../../../core/usecases/product/FindProductsByBrand";
import { GetProductsWithFeatures } from "../../../core/usecases/product/GetProductsWithFeatures";
import { UpdateProduct } from "../../../core/usecases/product/UpdateProduct";
import { DeleteProduct } from "../../../core/usecases/product/DeleteProduct";
import { ProductMapper } from "../mappers/ProductMapper";
import { BusinessError } from "../../../shared/errors/BusinessError";
import { BrandRepository } from "../../repositories/BrandRepository";
import { FeatureRepository } from "../../repositories/FeatureRepository";

const productRepo = new ProductRepository();

 export const createProduct = async (req: Request, res: Response) => {
  try {
    const dto: CreateProductDTO = req.body;
    
    const brandRepo = new BrandRepository();
    const featureRepo = new FeatureRepository();
    const productRepo = new ProductRepository();

    const useCase = new CreateProduct(productRepo, brandRepo, featureRepo);
    const product = await useCase.execute(dto);

    return res.status(201).json(ProductMapper.toDTO(product));
  } catch (err: any) {
    const status = err instanceof BusinessError && 
                  (err.errorCode === 'BRAND_NOT_FOUND' || err.errorCode === 'FEATURE_NOT_FOUND') 
                  ? 404 : 400;
    return res.status(status).json({ 
      error: err.message,
      ...(err instanceof BusinessError && { errorCode: err.errorCode })
    });
  }
};

  export const getProduct = async (req: Request, res: Response) => {
    try {
      const useCase = new GetProductById(productRepo);
      const product = await useCase.execute(Number(req.params.id));
      return res.json(ProductMapper.toDTO(product));
    } catch (err: any) {
      return res.status(404).json({ 
        error: err.message,
        ...(err instanceof BusinessError && { errorCode: err.errorCode })
      });
    }
  };

  export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const useCase = new ListProducts(productRepo);
    const products = await useCase.execute();
    if (!products || products.length === 0) {
      return res.status(200).json([]);
    }
    return res.json(products.map(ProductMapper.toDTO));
  } catch (err: any) {
    console.error("Erreur récupération produits:", err);
    return res.status(500).json({ 
      error: err.message,
      ...(err instanceof BusinessError && { errorCode: err.errorCode })
    });
  }
};

  export const getProductsByBrand = async (req: Request, res: Response) => {
    try {
      const useCase = new FindProductsByBrand(productRepo);
      const products = await useCase.execute(Number(req.params.brandId));
      return res.json(products.map(ProductMapper.toDTO));
    } catch (err: any) {
      return res.status(404).json({ 
        error: err.message,
        ...(err instanceof BusinessError && { errorCode: err.errorCode })
      });
    }
  };

  export const getProductsWithFeatures = async (req: Request, res: Response) => {
    try {
      const featureIds = req.query.features 
        ? (req.query.features as string).split(',').map(Number)
        : undefined;

      const useCase = new GetProductsWithFeatures(productRepo);
      const products = await useCase.execute();
      
      const filteredProducts = featureIds
        ? products.filter(p => 
            p.features.some(f => featureIds.includes(f.feature.id))
          )
        : products;

      return res.json(filteredProducts.map(ProductMapper.toDTO));
    } catch (err: any) {
      return res.status(400).json({ 
        error: err.message,
        ...(err instanceof BusinessError && { errorCode: err.errorCode })
      });
    }
  };

  export const searchProducts = async (req: Request, res: Response) => {
    try {
      const name = req.query.name as string;
      if (!name) {
        throw new BusinessError("Le paramètre 'name' est requis");
      }

      const useCase = new FindProductByName(productRepo);
      const products = await useCase.execute(name);
      return res.json(products.map(ProductMapper.toDTO));
    } catch (err: any) {
      return res.status(400).json({ 
        error: err.message,
        ...(err instanceof BusinessError && { errorCode: err.errorCode })
      });
    }
  };

  export const updateProduct = async (req: Request, res: Response) => {
    try {
      const dto: UpdateProductDTO = {
        id: Number(req.params.id),
        ...req.body
      };

      const useCase = new UpdateProduct(productRepo);
      await useCase.execute(dto.id, dto);

      const updatedProduct = await productRepo.findById(dto.id);
      if (!updatedProduct) {
        throw new BusinessError("Produit introuvable après mise à jour");
      }

      return res.json(ProductMapper.toDTO(updatedProduct));
    } catch (err: any) {
      const status = err instanceof BusinessError && err.errorCode === 'PRODUCT_NOT_FOUND' ? 404 : 400;
      return res.status(status).json({ 
        error: err.message,
        ...(err instanceof BusinessError && { errorCode: err.errorCode })
      });
    }
  };

  export const deleteProduct = async (req: Request, res: Response) => {
    try {
      const useCase = new DeleteProduct(productRepo);
      await useCase.execute(Number(req.params.id));
      return res.status(204).send();
    } catch (err: any) {
      return res.status(404).json({ 
        error: err.message,
        ...(err instanceof BusinessError && { errorCode: err.errorCode })
      });
    }
  };