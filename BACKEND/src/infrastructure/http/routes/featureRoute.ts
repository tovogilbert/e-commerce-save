import { Router } from "express";
import { createFeature, getFeature, getAllFeatures, updateFeature, deleteFeature } from "../controllers/FeatureController";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Features
 *   description: Gestion des caractéristiques produits
 */

/**
 * @swagger
 * /api/features:
 *   post:
 *     summary: Créer une nouvelle caractéristique
 *     tags: [Features]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Couleur"
 *     responses:
 *       201:
 *         description: Caractéristique créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feature'
 *       400:
 *         description: Erreur de validation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", (req, res, next) => {
  createFeature(req, res).catch(next);
});

/**
 * @swagger
 * /api/features:
 *   get:
 *     summary: Lister toutes les caractéristiques
 *     tags: [Features]
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
 *         description: Liste des caractéristiques
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Feature'
 */
router.get("/", (req, res, next) => {
  getAllFeatures(req, res).catch(next);
});

/**
 * @swagger
 * /api/features/{id}:
 *   get:
 *     summary: Récupérer une caractéristique par son ID
 *     tags: [Features]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la caractéristique
 *     responses:
 *       200:
 *         description: Caractéristique trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feature'
 *       404:
 *         description: Caractéristique non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", (req, res, next) => {
  getFeature(req, res).catch(next);
});

/**
 * @swagger
 * /api/features/{id}:
 *   put:
 *     summary: Mettre à jour une caractéristique
 *     tags: [Features]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la caractéristique à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nouveau nom"
 *     responses:
 *       200:
 *         description: Caractéristique mise à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feature'
 *       400:
 *         description: Erreur de validation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Caractéristique non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", (req, res, next) => {
  updateFeature(req, res).catch(next);
});

/**
 * @swagger
 * /api/features/{id}:
 *   delete:
 *     summary: Supprimer une caractéristique
 *     tags: [Features]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la caractéristique à supprimer
 *     responses:
 *       204:
 *         description: Caractéristique supprimée avec succès
 *       404:
 *         description: Caractéristique non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", (req, res, next) => {
  deleteFeature(req, res).catch(next);
});

export default router;