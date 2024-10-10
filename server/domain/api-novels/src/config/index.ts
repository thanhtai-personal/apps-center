import { config } from 'dotenv';

config({ path: '.env' });

export * from './db.config';
export * from './env.config';
export * from './caching.config';
export * from './https.config';
