const financialService = require("../services/financialService");
const { sendSuccess } = require("../utils/apiResponse");

const createRecord = async (req, res) => {
  const record = await financialService.createRecord({
    ...req.body,
    createdBy: req.user.id
  });

  return sendSuccess(res, "Financial record created successfully", record, 201);
};

const getAllRecords = async (req, res) => {
  const records = await financialService.getAllRecords(req.query);
  return sendSuccess(res, "Financial records fetched successfully", records);
};

const updateRecord = async (req, res) => {
  const recordId = Number(req.params.id);
  const updatedRecord = await financialService.updateRecord(recordId, req.body);
  return sendSuccess(res, "Financial record updated successfully", updatedRecord);
};

const deleteRecord = async (req, res) => {
  const recordId = Number(req.params.id);
  await financialService.deleteRecord(recordId);
  return sendSuccess(res, "Financial record deleted successfully", null);
};

module.exports = {
  createRecord,
  getAllRecords,
  updateRecord,
  deleteRecord
};
