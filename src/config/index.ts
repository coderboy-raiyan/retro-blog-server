import { configDotenv } from 'dotenv';
import { join } from 'path';

configDotenv({ path: join(process.cwd(), '.env') });

const config = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    DB_URI: process.env.DB_URI,
};

export default config;
