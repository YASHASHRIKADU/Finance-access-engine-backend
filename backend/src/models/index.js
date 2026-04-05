const User = require("./User");
const FinancialRecord = require("./FinancialRecord");

User.hasMany(FinancialRecord, {
  foreignKey: "createdBy",
  as: "records"
});

FinancialRecord.belongsTo(User, {
  foreignKey: "createdBy",
  as: "creator"
});

module.exports = {
  User,
  FinancialRecord
};
