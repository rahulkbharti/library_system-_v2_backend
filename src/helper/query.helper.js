import db from '../utils/db.js';
import logger from '../utils/logger.js';

const runQuery = async (sql, params = []) => {
    try {
        const [rows] = await db.execute(sql, params);
        return rows;
    } catch (error) {
        logger.error(error.message);
        return {error} // Return error with status code
    }
};

export default runQuery;
