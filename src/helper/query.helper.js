// import logger from "../utils/logger";
import db from "../utils/db.js"
const runQuery = async (sql, params = [], connection = null) => {
    try {
        const executor = connection || db;
        const [rows] = await executor.execute(sql, params);
        return rows;
    } catch (error) {
        // logger.error(error.message);
        return { error: true, message: error.message };
    }
};

export default runQuery;
