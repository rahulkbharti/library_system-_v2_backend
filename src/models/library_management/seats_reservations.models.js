import runQuery from "../../helper/query.helper.js";
import RunTransaction from "../../helper/transactions.helper.js";

const SeatsReservations = {
    create : (data)=>{
        const keys = Object.keys(data);
        const values = Object.values(data);
        const query = `INSERT INTO seat_reservations (${keys.join(", ")}) VALUES (${keys.map(() => "?").join(", ")})`;
        return runQuery(query, values);
    },
    view: (reservation_id) => {
        const query = reservation_id
            ? "SELECT * FROM seat_reservations WHERE reservation_id = ?"
            : "SELECT * FROM seat_reservations";
        
        const params = reservation_id ? [reservation_id] : [];
        return runQuery(query, params);
    },
    update: (data) => {
        return RunTransaction(async (connection) => {
            const { update, reservation_id } = data;
            const keys = Object.keys(update);
            const values = Object.values(update);

            if (!keys.length) {
                throw new Error("No update fields provided");
            }
            const query = `UPDATE seat_reservations SET ${keys.map(key => `${key} = ?`).join(", ")} WHERE reservation_id = ?`;
            const result = await runQuery(query, [...values, reservation_id]);

            return result;
        });
    },
    delete: (reservation_id) => {
        return runQuery(`DELETE FROM seat_reservations WHERE reservation_id = ?`, [reservation_id]);
    }
}

export default SeatsReservations;