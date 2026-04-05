const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");

const userRoutes = require("./routes/userRoutes");
const financialRoutes = require("./routes/financialRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const swaggerSpec = require("./docs/swagger");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect(302, "/api-docs");
});

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Service is healthy" });
});

app.use("/api-docs", (req, res, next) => {
  // Force fresh responses for Swagger UI assets instead of 304 cache validation.
  req.headers["if-none-match"] = undefined;
  req.headers["if-modified-since"] = undefined;
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  res.set("Surrogate-Control", "no-store");
  next();
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/users", userRoutes);
app.use("/api/records", financialRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
