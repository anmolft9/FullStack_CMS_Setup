import "dotenv/config";
import express from "express";
const app = express();

import cors from "cors";
import helmet from "helmet";

const PORT = process.env.PORT || 8000;

// middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

//dbconnection
import { dbConnection } from "./src/config/dbConfig.js";
dbConnection();

import adminUserRouter from "./src/routers/adminUserRouter.js";
import categoryRouter from "./src/routers/categoryRouter.js";
import { adminAuth } from "./src/middlewares/auth-middleware/authMiddleware.js";
import paymentMethodRouter from "./src/routers/paymentMethodRouter.js";
app.use("/api/v1/admin-user", adminUserRouter);
app.use("/api/v1/category", adminAuth, categoryRouter);
app.use("/api/v1/payment-method", paymentMethodRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Hi there, you got lost.",
  });
});

app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.status || 404;

  res.status(statusCode).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server running at http://localhost:${PORT}`);
});
