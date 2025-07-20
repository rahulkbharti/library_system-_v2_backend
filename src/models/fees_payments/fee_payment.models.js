import runQuery from "../../helper/query.helper.js";
import RunTransaction from "../../helper/transactions.helper.js";

const PaymentModel = {
  create: (data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const query = `INSERT INTO fee_payments (${keys.join(", ")}) VALUES (${keys
      .map(() => "?")
      .join(", ")})`;
    return runQuery(query, values);
  },
  view: (payment_id, organization_ids = []) => {
    // console.log("organization_ids", organization_ids);
    let query = `
        SELECT * 
        FROM fee_payments fp 
        INNER JOIN staffs s ON s.user_id = fp.received_by
    `;
    const params = [];
    const conditions = [];

    if (payment_id) {
        conditions.push("fp.payment_id = ?");
        params.push(payment_id);
    }

    if (organization_ids.length > 0) {
        conditions.push(`s.organization_id IN (${organization_ids.map(() => "?").join(",")})`);
        params.push(...organization_ids);
    }

    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }

    return runQuery(query, params);
},
  update: (data) => {
    return RunTransaction(async (connection) => {
      const { update, payment_id } = data;
      const keys = Object.keys(update);
      const values = Object.values(update);

      if (!keys.length) {
        throw new Error("No update fields provided");
      }
      const query = `UPDATE fee_payments SET ${keys
        .map((key) => `${key} = ?`)
        .join(", ")} WHERE payment_id = ?`;
      const result = await runQuery(query, [...values, payment_id]);

      return result;
    });
  },
  delete: (payment_id) => {
    return runQuery(`DELETE FROM fee_payments WHERE payment_id = ?`, [
      payment_id,
    ]);
  },
};

export default PaymentModel;
