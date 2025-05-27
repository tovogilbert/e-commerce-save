import { Router } from "express";
import { getClientByEmail, getParticulier, getEntreprise, listParticuliers, listEntreprises, registerParticulier, registerEntreprise, deleteClient } from "../controllers/ClientController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Gestion des clients particuliers et entreprises
 */

/**
 * @swagger
 * /clients/particulier:
 *   post:
 *     summary: Enregistre un nouveau client particulier
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ParticulierCreateDTO'
 *     responses:
 *       201:
 *         description: Client créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClientResponseDTO'
 *       400:
 *         description: Données invalides
 */
router.post("/particulier", (req, res, next) => {
  registerParticulier(req, res).catch(next);
});

/**
 * @swagger
 * /clients/entreprise:
 *   post:
 *     summary: Enregistre un nouveau client entreprise
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EntrepriseCreateDTO'
 *     responses:
 *       201:
 *         description: Client créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClientResponseDTO'
 *       400:
 *         description: Données invalides
 */
router.post("/entreprise", (req, res, next) => {
  registerEntreprise(req, res).catch(next);
});

/**
 * @swagger
 * /clients/particulier/{id}:
 *   get:
 *     summary: Récupère un client particulier par son ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du client
 *     responses:
 *       200:
 *         description: Détails du client
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClientResponseDTO'
 *       404:
 *         description: Client non trouvé
 */
router.get("/particulier/:id", (req, res, next) => {
  getParticulier(req, res).catch(next);
});

/**
 * @swagger
 * /clients/entreprise/{id}:
 *   get:
 *     summary: Récupère un client entreprise par son ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du client
 *     responses:
 *       200:
 *         description: Détails du client
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClientResponseDTO'
 *       404:
 *         description: Client non trouvé
 */
router.get("/entreprise/:id", (req, res, next) => {
  getEntreprise(req, res).catch(next);
});

/**
 * @swagger
 * /clients/email/{email}:
 *   get:
 *     summary: Recherche un client par email
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email du client
 *     responses:
 *       200:
 *         description: Détails du client
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClientResponseDTO'
 *       404:
 *         description: Client non trouvé
 */
router.get("/email/:email", (req, res, next) => {
  getClientByEmail(req, res).catch(next);
});

/**
 * @swagger
 * /clients/particuliers:
 *   get:
 *     summary: Liste tous les clients particuliers
 *     tags: [Clients]
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
 *         description: Liste des clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ClientResponseDTO'
 */
router.get("/particuliers", (req, res, next) => {
  listParticuliers(req, res).catch(next);
});

/**
 * @swagger
 * /clients/entreprises:
 *   get:
 *     summary: Liste tous les clients entreprises
 *     tags: [Clients]
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
 *         description: Liste des clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ClientResponseDTO'
 */
router.get("/entreprises", (req, res, next) => {
  listEntreprises(req, res).catch(next);
});

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Supprime un client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du client
 *     responses:
 *       204:
 *         description: Client supprimé avec succès
 *       404:
 *         description: Client non trouvé
 */
router.delete("/:id", (req, res, next) => {
  deleteClient(req, res).catch(next);
});

export default router;