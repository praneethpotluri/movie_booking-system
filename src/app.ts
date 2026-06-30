import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "../routes/index";
import { globalErrorHandler } from "../middlewares/error.middleware";


dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/", (_, res) => {
  res.json({
    message: "Welcome to BookMyScreen API",
    status: "running",
    version: "1.0.0",
  });
});

// API health endpoint
app.get("/api/health", (_, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// ALL Routes
app.use("/api/v1", router);



// Global Error Handler (must be last)
app.use(globalErrorHandler);




export default app;

