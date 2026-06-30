"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const validateEnv = (key, defaultValue) => {
    const value = process.env[key];
    if (!value && !defaultValue) {
        throw new Error(`Environment variable ${key} is not defined`);
    }
    return value || defaultValue || '';
};
const config = {
    port: parseInt(process.env.PORT || '9000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    mongo: {
        uri: validateEnv('MONGO_CONNECTION_STRING'),
    },
    jwt: {
        accessTokenSecret: validateEnv('ACCESS_TOKEN_SECRET'),
        refreshTokenSecret: validateEnv('REFRESH_TOKEN_SECRET'),
        accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || '15m',
        refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '7d',
    },
    nodemailer: {
        email: validateEnv('NODEMAILER_EMAIL'),
        password: validateEnv('NODEMAILER_PASSWORD'),
    },
    frontend: {
        url: validateEnv('FRONTEND_URL', 'http://localhost:5173'),
    },
    hash: {
        secret: validateEnv('HASH_SECRET'),
    },
};
exports.config = config;
exports.default = config;
