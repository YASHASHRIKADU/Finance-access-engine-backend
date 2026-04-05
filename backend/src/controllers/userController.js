const userService = require("../services/userService");
const { sendSuccess } = require("../utils/apiResponse");

const registerUser = async (req, res) => {
  const user = await userService.registerUser(req.body);
  return sendSuccess(res, "User registered successfully", user, 201);
};

const loginUser = async (req, res) => {
  const result = await userService.loginUser(req.body);
  return sendSuccess(res, "Login successful", result, 200);
};

const getUsers = async (req, res) => {
  const users = await userService.getUsers();
  return sendSuccess(res, "Users fetched successfully", users);
};

const updateUser = async (req, res) => {
  const userId = Number(req.params.id);
  const updatedUser = await userService.updateUser(userId, req.body);
  return sendSuccess(res, "User updated successfully", updatedUser);
};

const updateUserStatus = async (req, res) => {
  const { id, status } = req.body;
  const updatedUser = await userService.updateUserStatus(id, status);
  return sendSuccess(res, "User status updated successfully", updatedUser);
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  updateUserStatus
};
