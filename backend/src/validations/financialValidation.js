const Joi = require("joi");

const createFinancialRecordSchema = Joi.object({
  amount: Joi.number().precision(2).required(),
  type: Joi.string().valid("INCOME", "EXPENSE").required(),
  category: Joi.string().trim().min(2).max(100).required(),
  date: Joi.string().isoDate().required(),
  description: Joi.string().allow("").max(500).optional()
});

const updateFinancialRecordSchema = Joi.object({
  amount: Joi.number().precision(2).optional(),
  type: Joi.string().valid("INCOME", "EXPENSE").optional(),
  category: Joi.string().trim().min(2).max(100).optional(),
  date: Joi.string().isoDate().optional(),
  description: Joi.string().allow("").max(500).optional()
}).min(1);

const financialFilterSchema = Joi.object({
  type: Joi.string().valid("INCOME", "EXPENSE").optional(),
  category: Joi.string().trim().optional(),
  startDate: Joi.string().isoDate().optional(),
  endDate: Joi.string().isoDate().optional()
});

module.exports = {
  createFinancialRecordSchema,
  updateFinancialRecordSchema,
  financialFilterSchema
};
