import app from "./app";
import connectDB from "../config/db";
import config from "../config/config";

const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();

    const port = config.port;
    const host = 'localhost';

    const server = app.listen(port, host, () => {
      console.log('\n');
      console.log('╔════════════════════════════════════════════╗');
      console.log('║     BookMyScreen - Backend Server         ║');
      console.log('╠════════════════════════════════════════════╣');
      console.log(`║  ✓ Server Running` + ' '.repeat(19) + '║');
      console.log(`║  Port: ${port}` + ' '.repeat(31) + '║');
      console.log(`║  Host: ${host}` + ' '.repeat(31) + '║');
      console.log(`║  Environment: ${config.nodeEnv}` + ' '.repeat(21) + '║');
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
  } catch (error) {
    console.error('✗ Failed to start server:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
};

startServer();
