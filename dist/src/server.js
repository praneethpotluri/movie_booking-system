"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("../config/db"));
const config_1 = __importDefault(require("../config/config"));
const startServer = async () => {
    try {
        // Connect to MongoDB first
        await (0, db_1.default)();
        const port = config_1.default.port;
        const host = 'localhost';
        const server = app_1.default.listen(port, host, () => {
            console.log('\n');
            console.log('╔════════════════════════════════════════════╗');
            console.log('║     BookMyScreen - Backend Server         ║');
            console.log('╠════════════════════════════════════════════╣');
            console.log(`║  ✓ Server Running` + ' '.repeat(19) + '║');
            console.log(`║  Port: ${port}` + ' '.repeat(31) + '║');
            console.log(`║  Host: ${host}` + ' '.repeat(31) + '║');
            console.log(`║  Environment: ${config_1.default.nodeEnv}` + ' '.repeat(21) + '║');
            console.log('║  URL: http://localhost:9000' + ' '.repeat(10) + '║');
            console.log('╚════════════════════════════════════════════╝');
            console.log('\n');
        });
        // Graceful shutdown
        process.on('SIGTERM', () => {
            console.log('\n✓ SIGTERM received, shutting down gracefully...');
            server.close(() => {
                console.log('✓ Server closed');
                process.exit(0);
            });
        });
        process.on('SIGINT', () => {
            console.log('\n✓ SIGINT received, shutting down gracefully...');
            server.close(() => {
                console.log('✓ Server closed');
                process.exit(0);
            });
        });
    }
    catch (error) {
        console.error('✗ Failed to start server:', error instanceof Error ? error.message : error);
        process.exit(1);
    }
};
startServer();
