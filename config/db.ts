import mongoose from 'mongoose';
import config from './config';

const connectDB = async (): Promise<void> => {
  try {
    const mongoOptions = {
      retryWrites: true,
      w: 'majority' as const,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    };

    await mongoose.connect(config.mongo.uri, mongoOptions);

    console.log('╔════════════════════════════════════════════╗');
    console.log('║  ✓ MongoDB Connected Successfully         ║');
    console.log('║  Database: ' + config.mongo.uri.split('/').pop()?.padEnd(27) + '║');
    console.log('║  Connection State: Connected' + ' '.repeat(10) + '║');
    console.log('╚════════════════════════════════════════════╝');

    // Connection event listeners
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠ MongoDB disconnected');
    });

    mongoose.connection.on('error', (error) => {
      console.error('✗ MongoDB connection error:', error.message);
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✓ MongoDB reconnected');
    });
  } catch (error) {
    console.error('╔════════════════════════════════════════════╗');
    console.error('║  ✗ MongoDB Connection Failed             ║');
    console.error('║  ' + (error instanceof Error ? error.message.padEnd(36) : 'Unknown Error'.padEnd(36)) + '║');
    console.error('╚════════════════════════════════════════════╝');
    process.exit(1);
  }
};

export default connectDB;
