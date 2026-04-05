const { fn, col, literal } = require("sequelize");

const { FinancialRecord, User } = require("../models");

const getSummary = async () => {
  const income = await FinancialRecord.sum("amount", { where: { type: "INCOME" } });
  const expenses = await FinancialRecord.sum("amount", { where: { type: "EXPENSE" } });

  const totalIncome = Number(income || 0);
  const totalExpenses = Number(expenses || 0);

  return {
    totalIncome,
    totalExpenses,
    netBalance: totalIncome - totalExpenses
  };
};

const getCategoryWise = async () => {
  return FinancialRecord.findAll({
    attributes: [
      "category",
      "type",
      [fn("SUM", col("amount")), "totalAmount"]
    ],
    group: ["category", "type"],
    order: [[literal("totalAmount"), "DESC"]]
  });
};

const getTrends = async () => {
  return FinancialRecord.findAll({
    attributes: [
      [fn("strftime", "%Y-%m", col("date")), "month"],
      [fn("SUM", literal("CASE WHEN type = 'INCOME' THEN amount ELSE 0 END")), "totalIncome"],
      [fn("SUM", literal("CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END")), "totalExpenses"]
    ],
    group: [fn("strftime", "%Y-%m", col("date"))],
    order: [[literal("month"), "ASC"]]
  });
};

const getRecent = async () => {
  return FinancialRecord.findAll({
    include: [{ model: User, as: "creator", attributes: ["id", "name", "email", "role"] }],
    order: [["createdAt", "DESC"]],
    limit: 5
  });
};

module.exports = {
  getSummary,
  getCategoryWise,
  getTrends,
  getRecent
};
