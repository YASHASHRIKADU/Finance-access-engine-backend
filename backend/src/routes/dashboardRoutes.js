const express = require("express");

const dashboardController = require("../controllers/dashboardController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.use(authenticate);
router.use(authorize(["ADMIN", "ANALYST"]));

/**
 * @swagger
 * tags:
 *   - name: Dashboard
 *     description: Dashboard analytics
 */

/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get dashboard summary
 *     description: Returns total income, total expenses and net balance.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard summary fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/StandardSuccess'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/SummaryResponse'
 */
router.get("/summary", asyncHandler(dashboardController.getSummary));

/**
 * @swagger
 * /api/dashboard/category-wise:
 *   get:
 *     summary: Get category-wise analytics
 *     description: Aggregates record totals by category and type.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category-wise analytics fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardSuccess'
 */
router.get("/category-wise", asyncHandler(dashboardController.getCategoryWise));

/**
 * @swagger
 * /api/dashboard/trends:
 *   get:
 *     summary: Get monthly trends
 *     description: Returns month-wise income and expense trend.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly trends fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardSuccess'
 */
router.get("/trends", asyncHandler(dashboardController.getTrends));

/**
 * @swagger
 * /api/dashboard/recent:
 *   get:
 *     summary: Get recent records
 *     description: Returns latest financial records.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent records fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardSuccess'
 */
router.get("/recent", asyncHandler(dashboardController.getRecent));

module.exports = router;
