import runQuery from "../../helper/query.helper.js";
import RunTransaction from "../../helper/transactions.helper.js";

const FeeModel = {
  create: (data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const query = `INSERT INTO fees (${keys.join(", ")}) VALUES (${keys
      .map(() => "?")
      .join(", ")})`;
    return runQuery(query, values);
  },
  view: (fee_id, organization_ids = []) => {
    let query = `
        SELECT f.* 
        FROM fees f 
        INNER JOIN staffs s ON s.user_id = f.created_by
    `;
    const params = [];
    const conditions = [];

    if (fee_id) {
      conditions.push("f.fee_id = ?");
      params.push(fee_id);
    }

    if (organization_ids.length > 0) {
      conditions.push(
        `s.organization_id IN (${organization_ids.map(() => "?").join(",")})`
      );
      params.push(...organization_ids);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    return runQuery(query, params);
  },
  update: (data) => {
    return RunTransaction(async (connection) => {
      const { update, fee_id } = data;
      const keys = Object.keys(update);
      const values = Object.values(update);

      if (!keys.length) {
        throw new Error("No update fields provided");
      }
      const query = `UPDATE fees SET ${keys
        .map((key) => `${key} = ?`)
        .join(", ")} WHERE fee_id = ?`;
      const result = await runQuery(query, [...values, fee_id]);

      return result;
    });
  },
  delete: (fee_id) => {
    return runQuery(`DELETE FROM fees WHERE fee_id = ?`, [fee_id]);
  },
};

export default FeeModel;
