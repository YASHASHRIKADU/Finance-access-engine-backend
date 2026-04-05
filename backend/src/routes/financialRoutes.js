const express = require("express");

const financialController = require("../controllers/financialController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");
const { idParamSchema } = require("../validations/commonValidation");
const {
  createFinancialRecordSchema,
  updateFinancialRecordSchema,
  financialFilterSchema
} = require("../validations/financialValidation");

const router = express.Router();

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   - name: Records
 *     description: Financial record management
 */

/**
 * @swagger
 * /api/records:
 *   get:
 *     summary: Get financial records
 *     description: Fetch all records with optional filters.
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [INCOME, EXPENSE]
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Financial records fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/StandardSuccess'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/RecordResponse'
 */
router.get(
  "/",
  authorize(["ADMIN", "ANALYST", "VIEWER"]),
  validate(financialFilterSchema, "query"),
  asyncHandler(financialController.getAllRecords)
);

/**
 * @swagger
 * /api/records:
 *   post:
 *     summary: Create a financial record
 *     description: Creates an income or expense record.
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecordRequest'
 *     responses:
 *       201:
 *         description: Financial record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/StandardSuccess'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/RecordResponse'
 */
router.post(
  "/",
  authorize(["ADMIN"]),
  validate(createFinancialRecordSchema),
  asyncHandler(financialController.createRecord)
);

/**
 * @swagger
 * /api/records/{id}:
 *   put:
 *     summary: Update a financial record
 *     description: Updates an existing record by ID.
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
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
 *             $ref: '#/components/schemas/RecordUpdateRequest'
 *     responses:
 *       200:
 *         description: Financial record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/StandardSuccess'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/RecordResponse'
 */
router.put(
  "/:id",
  authorize(["ADMIN"]),
  validate(idParamSchema, "params"),
  validate(updateFinancialRecordSchema),
  asyncHandler(financialController.updateRecord)
);

/**
 * @swagger
 * /api/records/{id}:
 *   delete:
 *     summary: Delete a financial record
 *     description: Deletes a record by ID.
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Financial record deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandardSuccess'
 */
router.delete(
  "/:id",
  authorize(["ADMIN"]),
  validate(idParamSchema, "params"),
  asyncHandler(financialController.deleteRecord)
);

module.exports = router;
