const { Op } = require("sequelize");

const { FinancialRecord, User } = require("../models");

const createRecord = async (payload) => {
  return FinancialRecord.create(payload);
};

const getAllRecords = async (filters) => {
  const where = {};

  if (filters.type) {
    where.type = filters.type;
  }
  if (filters.category) {
    where.category = filters.category;
  }
  if (filters.startDate || filters.endDate) {
    where.date = {};
    if (filters.startDate) {
      where.date[Op.gte] = filters.startDate;
    }
    if (filters.endDate) {
      where.date[Op.lte] = filters.endDate;
    }
  }

  return FinancialRecord.findAll({
    where,
    include: [{ model: User, as: "creator", attributes: ["id", "name", "email", "role"] }],
    order: [["date", "DESC"], ["id", "DESC"]]
  });
};

const updateRecord = async (id, payload) => {
  const existing = await FinancialRecord.findByPk(id);
  if (!existing) {
    const error = new Error("Financial record not found");
    error.statusCode = 404;
    throw error;
  }

  await existing.update(payload);
  return FinancialRecord.findByPk(id, {
    include: [{ model: User, as: "creator", attributes: ["id", "name", "email", "role"] }]
  });
};

const deleteRecord = async (id) => {
  const existing = await FinancialRecord.findByPk(id);
  if (!existing) {
    const error = new Error("Financial record not found");
    error.statusCode = 404;
    throw error;
  }

  await existing.destroy();
};

module.exports = {
  createRecord,
  getAllRecords,
  updateRecord,
  deleteRecord
};
