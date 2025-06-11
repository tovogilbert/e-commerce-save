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
import { BrandRepository } from "../../repositories/BrandRepository";import { FeatureRepository } from "../../repositories/FeatureRepository";
import cloudinary from '../../http/config/cloudinary'; // chemin selon ton projet



const productRepo = new ProductRepository();

  export const createProduct = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Aucun fichier image reçu" });
    }

   console.log("Fichier reçu :", req.file);
   console.log("Corps de la requête :", req.body);

    const brandId = parseInt(req.body.brandId);
    if (isNaN(brandId)) {
      return res.status(400).json({ error: "L'ID de la marque doit être un nombre valide" });
    }

    let featureIds: number[] = [];

    if (typeof req.body.features === 'string') {
      try {
        const parsed = JSON.parse(req.body.features);
        if (Array.isArray(parsed)) {
          featureIds = parsed.map(Number);
        } else {
          featureIds = [parseInt(req.body.features)];
        }
      } catch {
        if (!isNaN(parseInt(req.body.features))) {
          featureIds = [parseInt(req.body.features)];
        } else {
          return res.status(400).json({ error: "Format des features invalide" });
        }
      }
    }

    const dto: CreateProductDTO = {
      name: req.body.name,
      description: req.body.description,
      priceExclTax: parseFloat(req.body.priceExclTax),
      brandId: brandId,
      stockQty: parseInt(req.body.stockQty),
      featureIds: featureIds,
      image: req.file.path,
    };

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
    const id = Number(req.params.id);
    const product = await productRepo.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Produit introuvable" });
    }

    // 🔍 Étape 1 : Récupération du `public_id` depuis l'URL Cloudinary
    const imageUrl = product.image;
    const regex = /\/([^/]+)\.(jpg|jpeg|png|webp|svg)$/i;
    const match = imageUrl.match(regex);
    
    if (match) {
      const publicId = match[1]; // ex: "products/folder/abc123"
      const folderPath = imageUrl.split('/upload/')[1].split('.')[0]; // ex: "products/folder/abc123"
      
      // 🧹 Étape 2 : Suppression de l'image sur Cloudinary
      await cloudinary.uploader.destroy(folderPath);
    }

    // 🗑️ Étape 3 : Suppression du produit en base
    const useCase = new DeleteProduct(productRepo);
    await useCase.execute(id);

    return res.status(204).send();
  } catch (err: any) {
    return res.status(404).json({
      error: err.message,
      ...(err instanceof BusinessError && { errorCode: err.errorCode })
    });
  }
};
