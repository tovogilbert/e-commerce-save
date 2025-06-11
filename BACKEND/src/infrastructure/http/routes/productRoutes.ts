import { Router } from "express";
import { createProduct, getProduct, getAllProducts, getProductsByBrand, getProductsWithFeatures, searchProducts, updateProduct, deleteProduct } from "../controllers/ProductController";
import { upload } from '../../middleware/upload';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gestion des produits
 * 
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - priceExclTax
 *         - brandId
 *         - stockQty
 *         - image
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré
 *         name:
 *           type: string
 *           maxLength: 100
 *         description:
 *           type: string
 *         priceExclTax:
 *           type: number
 *           format: double
 *         brandId:
 *           type: integer
 *         stockQty:
 *           type: integer
 *         image:
 *           type: string
 *           format: uri
 *         featureIds:
 *           type: array
 *           items:
 *             type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 1
 *         name: "Chaussure de sport"
 *         description: "Chaussure confortable pour running"
 *         priceExclTax: 99.99
 *         brandId: 1
 *         stockQty: 50
 *         image: "http://example.com/chaussure.jpg"
 *         featureIds: [1, 2]
 *         createdAt: "2023-05-01T10:00:00Z"
 *         updatedAt: "2023-05-01T10:00:00Z"
 */

/**
 * @swagger
 * /products:
 *   post:
 *     tags: [Products]
 *     summary: Crée un nouveau produit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *           example:
 *             name: "Chaussure de sport"
 *             description: "Chaussure confortable pour running"
 *             priceExclTax: 99.99
 *             brandId: 1
 *             stockQty: 50
 *             image: "chaussure.jpg"
 *             featureIds: [1, 2]
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Erreur de validation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 errorCode:
 *                   type: string
 *       404:
 *         description: Marque ou caractéristique non trouvée
 */

// router.post("/", (req, res, next) => {
//   createProduct(req, res).catch(next);
// });
router.post('/', upload.single('image'), (req, res, next) => {
  createProduct(req, res).catch(next);
});

/**
 * @swagger
 * /products:
 *   get:
 *     tags: [Products]
 *     summary: Liste tous les produits
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Numéro de page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Nombre d'éléments par page
 *     responses:
 *       200:
 *         description: Liste des produits
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 */

router.get("/", (req, res, next) => {
  getAllProducts(req, res).catch(next);
});

/**
 * @swagger
 * /products/by-brand/{brandId}:
 *   get:
 *     tags: [Products]
 *     summary: Liste les produits par marque
 *     parameters:
 *       - in: path
 *         name: brandId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des produits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Marque non trouvée
 */

router.get("/by-brand/:brandId", (req, res, next) => {
  getProductsByBrand(req, res).catch(next);
});

/**
 * @swagger
 * /products/with-features:
 *   get:
 *     tags: [Products]
 *     summary: Liste les produits avec leurs caractéristiques
 *     parameters:
 *       - in: query
 *         name: features
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         style: form
 *         explode: false
 *         example: "1,2"
 *         description: IDs des caractéristiques séparés par des virgules
 *     responses:
 *       200:
 *         description: Liste des produits avec caractéristiques
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

router.get("/with-features", (req, res, next) => {
  getProductsWithFeatures(req, res).catch(next);
});

/**
 * @swagger
 * /products/search:
 *   get:
 *     tags: [Products]
 *     summary: Recherche de produits
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Terme de recherche
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Résultats de recherche
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

router.get("/search", (req, res, next) => {
  searchProducts(req, res).catch(next);
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Récupère un produit par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails du produit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produit non trouvé
 */

router.get("/:id", (req, res, next) => {
  getProduct(req, res).catch(next);
});

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     tags: [Products]
 *     summary: Met à jour un produit
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Produit mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Erreur de validation
 *       404:
 *         description: Produit non trouvé
 */

router.put("/:id", (req, res, next) => {
  updateProduct(req, res).catch(next);
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: Supprime un produit
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Produit supprimé
 *       404:
 *         description: Produit non trouvé
 */

router.delete("/:id", (req, res, next) => {
  deleteProduct(req, res).catch(next);
});

export default router;