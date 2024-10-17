import path from 'path';

export const __ROOT_DIR__ = path.resolve(__dirname, '..', '..');

export const EnvironmentConfig = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.PORT ?? '8080'),
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  CORS_CREDENTIALS: process.env.CORS_CREDENTIALS === 'true',
  API_PREFIX: process.env.API_PREFIX ?? '/api',
};
