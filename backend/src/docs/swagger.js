const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Finance Backend API",
    version: "1.0.0",
    description: "Finance Data Processing and Access Control Backend System"
  },
  servers: [
    {
      url: "http://localhost:5000"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },
    schemas: {
      RegisterRequest: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string", example: "John Doe" },
          email: { type: "string", format: "email", example: "john@example.com" },
          password: { type: "string", example: "StrongPass123" }
        }
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email", example: "john@example.com" },
          password: { type: "string", example: "StrongPass123" }
        }
      },
      UpdateUserRequest: {
        type: "object",
        properties: {
          name: { type: "string", example: "Jane Doe" },
          email: { type: "string", format: "email", example: "jane@example.com" },
          password: { type: "string", example: "NewStrongPass123" },
          role: { type: "string", enum: ["ADMIN", "ANALYST", "VIEWER"] },
          status: { type: "string", enum: ["ACTIVE", "INACTIVE"] }
        }
      },
      UpdateStatusRequest: {
        type: "object",
        required: ["id", "status"],
        properties: {
          id: { type: "integer", example: 1 },
          status: { type: "string", enum: ["ACTIVE", "INACTIVE"] }
        }
      },
      RecordRequest: {
        type: "object",
        required: ["amount", "type", "category", "date"],
        properties: {
          amount: { type: "number", example: 1250.5 },
          type: { type: "string", enum: ["INCOME", "EXPENSE"] },
          category: { type: "string", example: "Salary" },
          date: { type: "string", format: "date", example: "2026-04-01" },
          description: { type: "string", example: "Monthly salary" }
        }
      },
      RecordUpdateRequest: {
        type: "object",
        properties: {
          amount: { type: "number", example: 500 },
          type: { type: "string", enum: ["INCOME", "EXPENSE"] },
          category: { type: "string", example: "Food" },
          date: { type: "string", format: "date", example: "2026-04-02" },
          description: { type: "string", example: "Groceries" }
        }
      },
      UserResponse: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "John Doe" },
          email: { type: "string", format: "email", example: "john@example.com" },
          role: { type: "string", enum: ["ADMIN", "ANALYST", "VIEWER"] },
          status: { type: "string", enum: ["ACTIVE", "INACTIVE"] },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      },
      AuthResponse: {
        type: "object",
        properties: {
          token: { type: "string" },
          user: { $ref: "#/components/schemas/UserResponse" }
        }
      },
      RecordResponse: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          amount: { type: "number", example: 1200.5 },
          type: { type: "string", enum: ["INCOME", "EXPENSE"] },
          category: { type: "string", example: "Salary" },
          date: { type: "string", format: "date", example: "2026-04-01" },
          description: { type: "string", nullable: true },
          createdBy: { type: "integer", example: 1 },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      },
      SummaryResponse: {
        type: "object",
        properties: {
          totalIncome: { type: "number", example: 5000 },
          totalExpenses: { type: "number", example: 2100 },
          netBalance: { type: "number", example: 2900 }
        }
      },
      StandardSuccess: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: { nullable: true }
        }
      },
      StandardError: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          message: { type: "string", example: "Error message" }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"]
};

module.exports = swaggerJSDoc(options);
