"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_1 = __importDefault(require("../routes/index"));
const error_middleware_1 = require("../middlewares/error.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:5173"],
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
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
app.use("/api/v1", index_1.default);
// Global Error Handler (must be last)
app.use(error_middleware_1.globalErrorHandler);
exports.default = app;
