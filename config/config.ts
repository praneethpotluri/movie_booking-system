import dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  port: number;
  nodeEnv: string;
  mongo: {
    uri: string;
  };
  jwt: {
    accessTokenSecret: string;
    refreshTokenSecret: string;
    accessTokenExpiry: string;
    refreshTokenExpiry: string;
  };
  nodemailer: {
    email: string;
    password: string;
  };
  frontend: {
    url: string;
  };
  hash: {
    secret: string;
  };
}

const validateEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value || defaultValue || '';
};

const config: IConfig = {
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

export default config;
export { config };

export type { IConfig };