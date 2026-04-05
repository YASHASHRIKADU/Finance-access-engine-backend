const express = require("express");

const userController = require("../controllers/userController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");
const { idParamSchema } = require("../validations/commonValidation");
const {
  registerSchema,
  loginSchema,
  updateUserSchema,
  updateStatusSchema
} = require("../validations/userValidation");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User registration, authentication, and management
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a user with default VIEWER role and ACTIVE status.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/StandardSuccess'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/UserResponse'
 */
router.post("/register", validate(registerSchema), asyncHandler(userController.registerUser));

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     description: Logs in a user and returns JWT token.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/StandardSuccess'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AuthResponse'
 */
router.post("/login", validate(loginSchema), asyncHandler(userController.loginUser));

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Returns all users (ADMIN only).
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
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
 *                         $ref: '#/components/schemas/UserResponse'
 */
router.get("/", authenticate, authorize(["ADMIN"]), asyncHandler(userController.getUsers));

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Updates user profile fields by ID (ADMIN only).
 *     tags: [Users]
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
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/StandardSuccess'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/UserResponse'
 */
router.put(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  validate(idParamSchema, "params"),
  validate(updateUserSchema),
  asyncHandler(userController.updateUser)
);

/**
 * @swagger
 * /api/users/status:
 *   patch:
 *     summary: Update user status
 *     description: Activates or deactivates a user by ID (ADMIN only).
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateStatusRequest'
 *     responses:
 *       200:
 *         description: User status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/StandardSuccess'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/UserResponse'
 */
router.patch(
  "/status",
  authenticate,
  authorize(["ADMIN"]),
  validate(updateStatusSchema),
  asyncHandler(userController.updateUserStatus)
);

module.exports = router;
