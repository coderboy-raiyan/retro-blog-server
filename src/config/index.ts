import { configDotenv } from 'dotenv';
import { join } from 'path';

configDotenv({ path: join(process.cwd(), '.env') });

const config = {
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production',
    DB_URI: process.env.DB_URI,
};

export default config;
