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
  view: (group_id, organization_id = null) => {
    let query = "select gp.*, g.organization_id from group_permissions gp inner join groups g on g.id = gp.group_id ";
    const params = [];

    if (group_id || organization_id) {
      query += " WHERE";

      if (group_id) {
        query += " gp.group_id = ?";
        params.push(group_id);
      }

      if (organization_id) {
        if (group_id) query += " AND";
        query += " g.organization_id = ?";
        params.push(organization_id);
      }
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
        affectedRows: data.added_permissions.length + (data.removed_permissions ? data.removed_permissions.length : 0),
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
