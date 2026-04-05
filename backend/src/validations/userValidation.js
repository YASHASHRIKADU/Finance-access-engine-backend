const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(8).max(64).required()
});

const loginSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().required()
});

const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional(),
  email: Joi.string().trim().email().optional(),
  password: Joi.string().min(8).max(64).optional(),
  role: Joi.string().valid("ADMIN", "ANALYST", "VIEWER").optional(),
  status: Joi.string().valid("ACTIVE", "INACTIVE").optional()
}).min(1);

const createUserSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(8).max(64).required(),
  role: Joi.string().valid("ADMIN", "ANALYST", "VIEWER").required(),
  status: Joi.string().valid("ACTIVE", "INACTIVE").default("ACTIVE")
});

const updateStatusSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  status: Joi.string().valid("ACTIVE", "INACTIVE").required()
});

module.exports = {
  registerSchema,
  loginSchema,
  updateUserSchema,
  createUserSchema,
  updateStatusSchema
};
