const dashboardService = require("../services/dashboardService");
const { sendSuccess } = require("../utils/apiResponse");

const getSummary = async (req, res) => {
  const summary = await dashboardService.getSummary();
  return sendSuccess(res, "Dashboard summary fetched successfully", summary);
};

const getCategoryWise = async (req, res) => {
  const categoryData = await dashboardService.getCategoryWise();
  return sendSuccess(res, "Category-wise analytics fetched successfully", categoryData);
};

const getTrends = async (req, res) => {
  const trends = await dashboardService.getTrends();
  return sendSuccess(res, "Monthly trends fetched successfully", trends);
};

const getRecent = async (req, res) => {
  const recent = await dashboardService.getRecent();
  return sendSuccess(res, "Recent records fetched successfully", recent);
};

module.exports = {
  getSummary,
  getCategoryWise,
  getTrends,
  getRecent
};
