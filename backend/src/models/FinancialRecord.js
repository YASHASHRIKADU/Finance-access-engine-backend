const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const FinancialRecord = sequelize.define(
  "FinancialRecord",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM("INCOME", "EXPENSE"),
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "created_by"
    }
  },
  {
    tableName: "financial_records",
    underscored: true,
    timestamps: true
  }
);

module.exports = FinancialRecord;
