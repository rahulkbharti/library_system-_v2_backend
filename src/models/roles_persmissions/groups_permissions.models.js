import runQuery from "../../helper/query.helper.js";
import RunTransaction from "../../helper/transactions.helper.js";

const GroupPermissionsModel = {
  create: (data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const query = `INSERT INTO group_permissions (${keys.join(
      ", "
    )}) VALUES (${keys.map(() => "?").join(", ")})`;
    return runQuery(query, values);
  },
  view: (group_id, organization_ids = []) => {
    let query = `
        SELECT gp.*, g.organization_id 
        FROM group_permissions gp 
        INNER JOIN \`groups\` g ON g.id = gp.group_id
    `;
    const params = [];
    const conditions = [];

    if (group_id) {
      conditions.push("gp.group_id = ?");
      params.push(group_id);
    }

    if (organization_ids.length > 0) {
      conditions.push(
        `g.organization_id IN (${organization_ids.map(() => "?").join(",")})`
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
      // console.log("Data to update:", data);
      // Return dummy data for testing purposes
      if (data.removed_permissions && data.removed_permissions.length > 0) {
        // Create a string of comma-separated question marks for each permission
        const placeholders = data.removed_permissions.map(() => "?").join(",");
        const query = `DELETE FROM group_permissions WHERE group_id = ? AND permission_id IN (${placeholders})`;
        // console.log("Query to execute:", query);
        // Spread the parameters - group_id first, then each permission_id
        await connection.query(
          query,
          [data.group_id, ...data.removed_permissions] // Note the spread operator here
        );
      }
      if (data.added_permissions && data.added_permissions.length > 0) {
        const query =
          "INSERT INTO group_permissions (group_id, permission_id) VALUES ?";

        // Create array of arrays for bulk insert
        const values = data.added_permissions.map((permission_id) => [
          data.group_id,
          permission_id,
        ]);

        // Execute the query with proper parameters
        await connection.query(
          query,
          [values] // Note the array wrapping the values
        );
      }

      return {
        affectedRows:
          data.added_permissions.length +
          (data.removed_permissions ? data.removed_permissions.length : 0),
      };
    });
  },
  delete: (group_id) => {
    return runQuery(`DELETE FROM group_permissions WHERE group_id = ?`, [
      group_id,
    ]);
  },
};

export default GroupPermissionsModel;
