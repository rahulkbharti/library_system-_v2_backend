import runQuery from "../../helper/query.helper.js";
import RunTransaction from "../../helper/transactions.helper.js";

const OrganizationsModel = {
    create : (data)=>{
        const keys = Object.keys(data);
        const values = Object.values(data);
        const query = `INSERT INTO organizations (${keys.join(", ")}) VALUES (${keys.map(() => "?").join(", ")})`;
        return runQuery(query, values);
    },
    view: (created_by_admin) => {
        const query = created_by_admin
            ? "SELECT * FROM organizations WHERE created_by_admin = ?"
            : "SELECT * FROM organizations";
        
        const params = created_by_admin ? [created_by_admin] : [];
        return runQuery(query, params);
    },
    // Check : TODO: check for update if not then return in contoller
    update: (data) => {
        return RunTransaction(async (connection) => {
            const { update, organization_id } = data;
            const keys = Object.keys(update);
            const values = Object.values(update);

            if (!keys.length) {
                throw new Error("No update fields provided");
            }
            const query = `UPDATE organizations SET ${keys.map(key => `${key} = ?`).join(", ")} WHERE organization_id = ?`;
            const result = await runQuery(query, [...values, organization_id]);

            return result;
        });
    },
    delete: (organization_id) => {
        return runQuery(`DELETE FROM organizations WHERE organization_id = ?`, [organization_id]);
    }
}

export default OrganizationsModel;