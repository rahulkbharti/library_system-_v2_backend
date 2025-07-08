import mysql from 'mysql2/promise';
import logger from './logger.js';
import dotenv from 'dotenv';

dotenv.config({
    path: `.env.${process.env.NODE_ENV || 'development'}`,
});

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 3306,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
});

(async () => {
    try {
        const connection = await pool.getConnection();
        // console.log(chalk.blue('MySQL2 connected successfully'));
        logger.info('MySQL2 connected successfully');
        connection.release();
    } catch (err) {
        // console.error(chalk.red('Database connection failed:'), err.sqlMessage);
        logger.error('Database connection failed: '+ err.sqlMessage);
    }
})();

export default pool;
