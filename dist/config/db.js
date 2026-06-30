"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const connectDB = async () => {
    try {
        const mongoOptions = {
            retryWrites: true,
            w: 'majority',
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
        };
        await mongoose_1.default.connect(config_1.default.mongo.uri, mongoOptions);
        console.log('╔════════════════════════════════════════════╗');
        console.log('║  ✓ MongoDB Connected Successfully         ║');
        console.log('║  Database: ' + config_1.default.mongo.uri.split('/').pop()?.padEnd(27) + '║');
        console.log('║  Connection State: Connected' + ' '.repeat(10) + '║');
        console.log('╚════════════════════════════════════════════╝');
        // Connection event listeners
        mongoose_1.default.connection.on('disconnected', () => {
            console.warn('⚠ MongoDB disconnected');
        });
        mongoose_1.default.connection.on('error', (error) => {
            console.error('✗ MongoDB connection error:', error.message);
        });
        mongoose_1.default.connection.on('reconnected', () => {
            console.log('✓ MongoDB reconnected');
        });
    }
    catch (error) {
        console.error('╔════════════════════════════════════════════╗');
        console.error('║  ✗ MongoDB Connection Failed             ║');
        console.error('║  ' + (error instanceof Error ? error.message.padEnd(36) : 'Unknown Error'.padEnd(36)) + '║');
        console.error('╚════════════════════════════════════════════╝');
        process.exit(1);
    }
};
exports.default = connectDB;
