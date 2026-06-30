"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileValidation = exports.loginValidation = exports.registerValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerValidation = joi_1.default.object({
    name: joi_1.default.string()
        .min(2)
        .max(50)
        .required()
        .messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name cannot exceed 50 characters',
        'any.required': 'Name is required',
    }),
    email: joi_1.default.string()
        .email()
        .required()
        .messages({
        'string.empty': 'Email is required',
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required',
    }),
    password: joi_1.default.string()
        .min(6)
        .required()
        .messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters',
        'any.required': 'Password is required',
    }),
    phone: joi_1.default.string()
        .pattern(/^[0-9+\-\s()]+$/)
        .optional()
        .messages({
        'string.pattern.base': 'Please enter a valid phone number',
    }),
    city: joi_1.default.string()
        .max(100)
        .optional()
        .messages({
        'string.max': 'City name cannot exceed 100 characters',
    }),
});
exports.loginValidation = joi_1.default.object({
    email: joi_1.default.string()
        .email()
        .required()
        .messages({
        'string.empty': 'Email is required',
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required',
    }),
    password: joi_1.default.string()
        .required()
        .messages({
        'string.empty': 'Password is required',
        'any.required': 'Password is required',
    }),
});
exports.updateProfileValidation = joi_1.default.object({
    name: joi_1.default.string()
        .min(2)
        .max(50)
        .optional()
        .messages({
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name cannot exceed 50 characters',
    }),
    phone: joi_1.default.string()
        .pattern(/^[0-9+\-\s()]+$/)
        .optional()
        .messages({
        'string.pattern.base': 'Please enter a valid phone number',
    }),
    city: joi_1.default.string()
        .max(100)
        .optional()
        .messages({
        'string.max': 'City name cannot exceed 100 characters',
    }),
});
