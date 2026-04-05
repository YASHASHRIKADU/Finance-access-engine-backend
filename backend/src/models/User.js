const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM("ADMIN", "ANALYST", "VIEWER"),
      allowNull: false,
      defaultValue: "VIEWER"
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      allowNull: false,
      defaultValue: "ACTIVE"
    }
  },
  {
    tableName: "users",
    underscored: true,
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ["password"] }
    },
    scopes: {
      withPassword: {
        attributes: { include: ["password"] }
      }
    }
  }
);

module.exports = User;
