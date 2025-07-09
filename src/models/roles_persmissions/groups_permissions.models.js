import runQuery from "../../helper/query.helper.js";
import RunTransaction from "../../helper/transactions.helper.js";

const GroupPermissionsModel = {
    create : (data)=>{
        const keys = Object.keys(data);
        const values = Object.values(data);
        const query = `INSERT INTO group_permissions (${keys.join(", ")}) VALUES (${keys.map(() => "?").join(", ")})`;
        return runQuery(query, values);
    },
    view: (group_id) => {
        const query = group_id
            ? "SELECT * FROM group_permissions WHERE group_id = ?"
            : "SELECT * FROM group_permissions";
        
        const params = group_id ? [group_id] : [];
        return runQuery(query, params);
    },
    update: (data) => {
        return RunTransaction(async (connection) => {
            const { update, group_id } = data;
            const keys = Object.keys(update);
            const values = Object.values(update);

            if (!keys.length) {
                throw new Error("No update fields provided");
            }
            const query = `UPDATE group_permissions SET ${keys.map(key => `${key} = ?`).join(", ")} WHERE group_id = ?`;
            const result = await runQuery(query, [...values, group_id]);

            return result;
        });
    },
    delete: (group_id) => {
        return runQuery(`DELETE FROM group_permissions WHERE group_id = ?`, [group_id]);
    }
}

export default GroupPermissionsModel;