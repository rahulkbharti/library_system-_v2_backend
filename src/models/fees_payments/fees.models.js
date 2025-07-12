import runQuery from "../../helper/query.helper.js";
import RunTransaction from "../../helper/transactions.helper.js";

const FeeModel = {
    create : (data)=>{
        const keys = Object.keys(data);
        const values = Object.values(data);
        const query = `INSERT INTO fees (${keys.join(", ")}) VALUES (${keys.map(() => "?").join(", ")})`;
        return runQuery(query, values);
    },
    view: (fee_id, organization_id = null) => {
    let query = "select f.* from fees f inner join staffs s  on s.user_id = f.created_by ";
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
            const { update, fee_id } = data;
            const keys = Object.keys(update);
            const values = Object.values(update);

            if (!keys.length) {
                throw new Error("No update fields provided");
            }
            const query = `UPDATE fees SET ${keys.map(key => `${key} = ?`).join(", ")} WHERE fee_id = ?`;
            const result = await runQuery(query, [...values, fee_id]);

            return result;
        });
    },
    delete: (fee_id) => {
        return runQuery(`DELETE FROM fees WHERE fee_id = ?`, [fee_id]);
    }
}

export default FeeModel;