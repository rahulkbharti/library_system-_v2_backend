import runQuery from "../../helper/query.helper.js";
import RunTransaction from "../../helper/transactions.helper.js";
// TODO: having Transactions
const MonthlyFessModel = {
    create : (data)=>{
        const keys = Object.keys(data);
        const values = Object.values(data);
        const query = `INSERT INTO monthly_fee_details (${keys.join(", ")}) VALUES (${keys.map(() => "?").join(", ")})`;
        return runQuery(query, values);
    },
    view: (fees_id) => {
        const query = fees_id
            ? "SELECT * FROM monthly_fee_details WHERE fees_id = ?"
            : "SELECT * FROM monthly_fee_details";
        
        const params = fees_id ? [fees_id] : [];
        return runQuery(query, params);
    },
    update: (data) => {
        return RunTransaction(async (connection) => {
            const { update, fees_id } = data;
            const keys = Object.keys(update);
            const values = Object.values(update);

            if (!keys.length) {
                throw new Error("No update fields provided");
            }
            const query = `UPDATE monthly_fee_details SET ${keys.map(key => `${key} = ?`).join(", ")} WHERE fees_id = ?`;
            const result = await runQuery(query, [...values, fees_id]);

            return result;
        });
    },
    delete: (fees_id) => {
        return runQuery(`DELETE FROM monthly_fee_details WHERE fees_id = ?`, [fees_id]);
    }
}

export default MonthlyFessModel;