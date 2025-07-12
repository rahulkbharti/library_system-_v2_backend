import runQuery from "../../helper/query.helper.js";
import RunTransaction from "../../helper/transactions.helper.js";

const PaymentModel = {
    create : (data)=>{
        const keys = Object.keys(data);
        const values = Object.values(data);
        const query = `INSERT INTO fee_payments (${keys.join(", ")}) VALUES (${keys.map(() => "?").join(", ")})`;
        return runQuery(query, values);
    },
    view: (payment_id, organization_id = null) => {
    let query = "select * from fee_payments fp inner join staffs s on s.user_id = fp.received_by ";
    const params = [];
    
    if (payment_id || organization_id) {
        query += " WHERE";
        
        if (payment_id) {
            query += " payment_id = ?";
            params.push(payment_id);
        }
        
        if (organization_id) {
            if (payment_id) query += " AND";
            query += " organization_id = ?";
            params.push(organization_id);
        }
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
            const query = `UPDATE fee_payments SET ${keys.map(key => `${key} = ?`).join(", ")} WHERE payment_id = ?`;
            const result = await runQuery(query, [...values, payment_id]);

            return result;
        });
    },
    delete: (payment_id) => {
        return runQuery(`DELETE FROM fee_payments WHERE payment_id = ?`, [payment_id]);
    }
   
}

export default PaymentModel;