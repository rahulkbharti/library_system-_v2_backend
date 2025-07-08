import db from "../utils/db.js";
import logger from "../utils/logger.js";

const RunTransaction = async (transactionCallback) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const result = await transactionCallback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    logger.error(error.message);
    return {error}; // Return error with status code
  } finally {
    connection.release();
  }
};

export default RunTransaction;
