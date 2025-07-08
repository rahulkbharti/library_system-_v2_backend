import pg from 'pg';
import logger from './logger.js';
import dotenv from 'dotenv';

dotenv.config({
    path: `.env.${process.env.NODE_ENV || 'development'}`,
});

const { Pool } = pg;

const pool = new Pool({
    host: process.env.POSTGRESQL_ADDON_HOST,
    user: process.env.POSTGRESQL_ADDON_USER,
    password: process.env.POSTGRESQL_ADDON_PASSWORD,
    database: process.env.POSTGRESQL_ADDON_DB,
    port: process.env.POSTGRESQL_ADDON_PORT,
    ssl: { rejectUnauthorized: false },
    max:5
});

(async () => {
    try {
        const client = await pool.connect();
        logger.info('PostgreSQL connected successfully');
        client.release();
    } catch (err) {
        logger.error('Database connection failed: ' + err.message);
    }
})();

export default pool;
