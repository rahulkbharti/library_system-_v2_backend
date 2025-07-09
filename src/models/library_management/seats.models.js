import runQuery from "../../helper/query.helper.js";
import RunTransaction from "../../helper/transactions.helper.js";

const SeatsModel = {
    create : (data)=>{
        const keys = Object.keys(data);
        const values = Object.values(data);
        const query = `INSERT INTO seats (${keys.join(", ")}) VALUES (${keys.map(() => "?").join(", ")})`;
        return runQuery(query, values);
    },
    view: (seat_id) => {
        const query = seat_id
            ? "SELECT * FROM seats WHERE seat_id = ?"
            : "SELECT * FROM seats";
        
        const params = seat_id ? [seat_id] : [];
        return runQuery(query, params);
    },
    update: (data) => {
        return RunTransaction(async (connection) => {
            const { update, seat_id } = data;
            const keys = Object.keys(update);
            const values = Object.values(update);

            if (!keys.length) {
                throw new Error("No update fields provided");
            }
            const query = `UPDATE seats SET ${keys.map(key => `${key} = ?`).join(", ")} WHERE seat_id = ?`;
            const result = await runQuery(query, [...values, seat_id]);

            return result;
        });
    },
    delete: (seat_id) => {
        return runQuery(`DELETE FROM seats WHERE seat_id = ?`, [seat_id]);
    }
}

export default SeatsModel;