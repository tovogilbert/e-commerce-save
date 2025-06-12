import { Router } from "express";
import { createBrand, getBrand, getAllBrands, getBrandByName, updateBrand, deleteBrand, searchBrands } from "../controllers/BrandController";
import { Request, Response, NextFunction } from 'express';


const router = Router();

// === CRÉATION ===
router.post("/", (req: Request, res: Response, next: NextFunction) => {
  createBrand(req, res).catch(next);
});

// === LECTURE ===
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  getAllBrands(req, res).catch(next);
});

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  getBrand(req, res).catch(next);
});

router.get("/by-name", (req: Request, res: Response, next: NextFunction) => {
  getBrandByName(req, res).catch(next);
});

router.get("/search", (req, res, next) => { 
  searchBrands(req, res).catch(next);
});

// === MISE À JOUR ===
router.put("/:id", (req, res, next) => {
  updateBrand(req, res).catch(next);
});

// === SUPPRESSION ===
router.delete("/:id", (req, res, next) => {
  deleteBrand(req, res).catch(next);
});

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Gestion des marques de produits
 */

/**
 * @swagger
 * /brands:
 *   post:
 *     tags: [Brands]
 *     summary: Crée une nouvelle marque
 *     description: Enregistre une nouvelle marque dans la base de données
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brand'
 *           example:
 *             name: "Nike"
 *     responses:
 *       201:
 *         description: Marque créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       400:
 *         description: Erreur de validation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /brands:
 *   get:
 *     tags: [Brands]
 *     summary: Liste toutes les marques
 *     description: Retourne une liste paginée de toutes les marques
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Numéro de page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Nombre d'éléments par page
 *     responses:
 *       200:
 *         description: Liste des marques paginée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Brand'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 15
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     tags: [Brands]
 *     summary: Récupère une marque par son ID
 *     description: Retourne les détails d'une marque spécifique
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la marque
 *     responses:
 *       200:
 *         description: Détails de la marque
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: Marque non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /brands/by-name:
 *   get:
 *     tags: [Brands]
 *     summary: Recherche une marque par nom exact
 *     description: Retourne une marque correspondant exactement au nom spécifié
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nom exact de la marque
 *     responses:
 *       200:
 *         description: Marque trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: Marque non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Paramètre name manquant
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /brands/search:
 *   get:
 *     tags: [Brands]
 *     summary: Recherche des marques par nom
 *     description: Retourne les marques dont le nom contient la chaîne recherchée
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Terme de recherche
 *     responses:
 *       200:
 *         description: Liste des marques correspondantes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 *       400:
 *         description: Paramètre name manquant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Aucune marque trouvée
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /brands/{id}:
 *   put:
 *     tags: [Brands]
 *     summary: Met à jour une marque
 *     description: Modifie les informations d'une marque existante
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la marque à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brand'
 *           example:
 *             name: "Nike Updated"
 *     responses:
 *       200:
 *         description: Marque mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       400:
 *         description: Erreur de validation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Marque non trouvée
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     tags: [Brands]
 *     summary: Supprime une marque
 *     description: Supprime définitivement une marque de la base de données
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la marque à supprimer
 *     responses:
 *       204:
 *         description: Marque supprimée avec succès
 *       404:
 *         description: Marque non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erreur serveur
 */


export default router;