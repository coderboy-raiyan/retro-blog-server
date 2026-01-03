import { configDotenv } from 'dotenv';
import { join } from 'path';

configDotenv({ path: join(process.cwd(), '.env') });

const config = {
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production',
    DATABASE_URL: process.env.DATABASE_URL,
    APP_URL: process.env.APP_URL || 'http://localhost:3000',
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || 'http://localhost:5000',
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_USER: process.env.SMTP_USER,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};

export default config;
