import runQuery from "../../helper/query.helper.js";
import RunTransaction from "../../helper/transactions.helper.js";
// TODO: having Transactions
const MonthlyFessModel = {
  create: (data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const query = `INSERT INTO monthly_fee_details (${keys.join(
      ", "
    )}) VALUES (${keys.map(() => "?").join(", ")})`;
    return runQuery(query, values);
  },
  view: (fee_id, organization_id = null) => {
    let query = "select mfd.*, f.* from monthly_fee_details mfd inner join fees f on f.id = mfd.fee_id inner join students s on s.user_id = f.student_id ";
    
    const params = [];

    if (fee_id || organization_id) {
      query += " WHERE";

      if (fee_id) {
        query += " fee_id = ?";
        params.push(fee_id);
      }

      if (organization_id) {
        if (fee_id) query += " AND";
        query += " organization_id = ?";
        params.push(organization_id);
      }
    }

    return runQuery(query, params);
  },
  update: (data) => {
    return RunTransaction(async (connection) => {
      const { update, fees_id } = data;
      const keys = Object.keys(update);
      const values = Object.values(update);

      if (!keys.length) {
        throw new Error("No update fields provided");
      }
      const query = `UPDATE monthly_fee_details SET ${keys
        .map((key) => `${key} = ?`)
        .join(", ")} WHERE fees_id = ?`;
      const result = await runQuery(query, [...values, fees_id]);

      return result;
    });
  },
  delete: (fees_id) => {
    return runQuery(`DELETE FROM monthly_fee_details WHERE fees_id = ?`, [
      fees_id,
    ]);
  },
};

export default MonthlyFessModel;
