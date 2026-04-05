const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const { User } = require("../models");
const { generateToken } = require("../utils/jwt");

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.unscoped().findOne({ where: { email } });
  if (existingUser) {
    const error = new Error("Email already registered");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "VIEWER",
    status: "ACTIVE"
  });

  return User.findByPk(createdUser.id);
};

const loginUser = async ({ email, password }) => {
  const user = await User.scope("withPassword").findOne({ where: { email } });
  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  if (user.status !== "ACTIVE") {
    const error = new Error("User account is inactive");
    error.statusCode = 403;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    }
  };
};

const getUsers = async () => {
  return User.findAll({ order: [["id", "DESC"]] });
};

const updateUser = async (id, payload) => {
  const existingUser = await User.unscoped().findByPk(id);
  if (!existingUser) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (payload.email && payload.email !== existingUser.email) {
    const duplicateEmail = await User.unscoped().findOne({
      where: {
        email: payload.email,
        id: { [Op.ne]: id }
      }
    });
    if (duplicateEmail) {
      const error = new Error("Email already in use by another user");
      error.statusCode = 409;
      throw error;
    }
  }

  const updates = { ...payload };
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }

  await existingUser.update(updates);
  return User.findByPk(id);
};

const updateUserStatus = async (id, status) => {
  const existingUser = await User.unscoped().findByPk(id);
  if (!existingUser) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  await existingUser.update({ status });
  return User.findByPk(id);
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  updateUserStatus
};
