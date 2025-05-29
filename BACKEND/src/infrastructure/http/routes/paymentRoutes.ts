import { Router } from "express";
import { createPayment, getPayment, getAllPayments } from "../controllers/PaymentController";

const router = Router();

// === CRÉATION ===
router.post("/", (req, res, next) => {
  createPayment(req, res).catch(next);
});

// === LECTURE ===
router.get("/", (req, res, next) => {
  getAllPayments(req, res).catch(next);
});

// === DÉTAIL ===
router.get("/:id", (req, res, next) => {
  getPayment(req, res).catch(next);
});

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Gestion des paiements
 */

/**
 * @swagger
 * /payments:
 *   post:
 *     tags: [Payments]
 *     summary: Crée un nouveau paiement
 *     description: Enregistre un nouveau paiement dans la base de données
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePaymentInput'
 *           example:
 *             amount: 99.99
 *             method: "carte"
 *             transactionRef: "TRX-123456"
 *     responses:
 *       201:
 *         description: Paiement créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
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
 * /payments:
 *   get:
 *     tags: [Payments]
 *     summary: Liste tous les paiements
 *     description: Retourne une liste paginée de tous les paiements
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
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [paymentDate, amount]
 *           default: paymentDate
 *         description: Champ de tri
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Ordre de tri
 *     responses:
 *       200:
 *         description: Liste des paiements paginée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentList'
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     tags: [Payments]
 *     summary: Récupère un paiement par son ID
 *     description: Retourne les détails d'un paiement spécifique
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du paiement
 *     responses:
 *       200:
 *         description: Détails du paiement
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Paiement non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erreur serveur
 */

export default router;