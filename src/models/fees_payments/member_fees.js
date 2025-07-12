import runQuery from "../../helper/query.helper.js";
import RunTransaction from "../../helper/transactions.helper.js";

const MemberFeeModel = {
  create: (data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const query = `INSERT INTO member_fees (${keys.join(", ")}) VALUES (${keys
      .map(() => "?")
      .join(", ")})`;
    return runQuery(query, values);
  },
  view: (student_fee_id, organization_id = null) => {
    let query =
      "select * from member_fees mf inner join students s on s.user_id = mf.student_id ";
    const params = [];

    if (student_fee_id || organization_id) {
      query += " WHERE";

      if (student_fee_id) {
        query += " student_fee_id = ?";
        params.push(student_fee_id);
      }

      if (organization_id) {
        if (student_fee_id) query += " AND";
        query += " organization_id = ?";
        params.push(organization_id);
      }
    }

    return runQuery(query, params);
  },
  update: (data) => {
    return RunTransaction(async (connection) => {
      const { update, student_fee_id } = data;
      const keys = Object.keys(update);
      const values = Object.values(update);

      if (!keys.length) {
        throw new Error("No update fields provided");
      }
      const query = `UPDATE member_fees SET ${keys
        .map((key) => `${key} = ?`)
        .join(", ")} WHERE student_fee_id = ?`;
      const result = await runQuery(query, [...values, student_fee_id]);

      return result;
    });
  },
  delete: (student_fee_id) => {
    return runQuery(`DELETE FROM member_fees WHERE student_fee_id = ?`, [student_fee_id]);
  },
};

export default MemberFeeModel;
