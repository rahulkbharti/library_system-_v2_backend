import runQuery from "../../helper/query.helper.js";
import RunTransaction from "../../helper/transactions.helper.js";

const PermissionModel = {
    create : (data)=>{
        const keys = Object.keys(data);
        const values = Object.values(data);
        const query = `INSERT INTO permissions (${keys.join(", ")}) VALUES (${keys.map(() => "?").join(", ")})`;
        return runQuery(query, values);
    },
    view: (id) => {
        const query = id
            ? "SELECT * FROM permissions WHERE id = ?"
            : "SELECT * FROM permissions";
        
        const params = id ? [id] : [];
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
            const query = `UPDATE permissions SET ${keys.map(key => `${key} = ?`).join(", ")} WHERE id = ?`;
            const result = await runQuery(query, [...values, id]);

            return result;
        });
    },
    delete: (id) => {
        return runQuery(`DELETE FROM permissions WHERE id = ?`, [id]);
    }
}

export default PermissionModel;