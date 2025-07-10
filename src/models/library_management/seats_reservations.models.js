import runQuery from "../../helper/query.helper.js";
import RunTransaction from "../../helper/transactions.helper.js";

const SeatsReservations = {
    create: (data) => {
        const keys = Object.keys(data);
        const values = Object.values(data);
        const query = `INSERT INTO seat_reservations (${keys.join(", ")}) VALUES (${keys.map(() => "?").join(", ")})`;
        return runQuery(query, values);
    },
    view: (reservation_id, organization_id = null) => {
        let query = "select * from seat_reservations sr inner join seats s ON s.seat_id = sr.seat_id ";
        const params = [];

        if (reservation_id || organization_id) {
            query += " WHERE";

            if (reservation_id) {
                query += " reservation_id = ?";
                params.push(reservation_id);
            }

            if (organization_id) {
                if (reservation_id) query += " AND";
                query += " organization_id = ?";
                params.push(organization_id);
            }
        }

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