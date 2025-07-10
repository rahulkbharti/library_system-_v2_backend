import runQuery from "../../helper/query.helper.js";
import RunTransaction from "../../helper/transactions.helper.js";

const GroupModel = {
    create : (data)=>{
    const keys = Object.keys(data);
    const values = Object.values(data);
        const query = `INSERT INTO groups (${keys.join(", ")}) VALUES (${keys.map(() => "?").join(", ")})`;
    return runQuery(query, values);
  },
  view: (id, organization_id = null) => {
    let query = "SELECT * FROM groups";
    const params = [];

    if (id || organization_id) {
      query += " WHERE";

      if (id) {
        query += " id = ?";
        params.push(id);
      }

      if (organization_id) {
        if (id) query += " AND";
        query += " organization_id = ?";
        params.push(organization_id);
      }
    }

    return runQuery(query, params);
  },
  update: (data) => {
    return RunTransaction(async (connection) => {
      const { update, id } = data;
      const keys = Object.keys(update);
      const values = Object.values(update);

      if (!keys.length) {
        throw new Error("No update fields provided");
      }
            const query = `UPDATE groups SET ${keys.map(key => `${key} = ?`).join(", ")} WHERE id = ?`;
      const result = await runQuery(query, [...values, id]);

      return result;
    });
  },
  delete: (id) => {
    return runQuery(`DELETE FROM groups WHERE id = ?`, [id]);
    }
}

export default GroupModel;