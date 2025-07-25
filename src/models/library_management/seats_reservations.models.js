import runQuery from "../../helper/query.helper.js";
import RunTransaction from "../../helper/transactions.helper.js";

const SeatsReservations = {
  create: (data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const query = `INSERT INTO seat_reservations (${keys.join(
      ", "
    )}) VALUES (${keys.map(() => "?").join(", ")})`;
    return runQuery(query, values);
  },
  view: (reservation_id, organization_ids = []) => {
    let query = `
        SELECT * 
        FROM seat_reservations sr 
        INNER JOIN seats s ON s.seat_id = sr.seat_id
    `;
    const params = [];
    const conditions = [];

    if (reservation_id) {
      conditions.push("sr.reservation_id = ?");
      params.push(reservation_id);
    }

    if (organization_ids.length > 0) {
      // Create placeholders for each organization_id (?,?,?)
      const placeholders = organization_ids.map(() => "?").join(",");
      conditions.push(`s.organization_id IN (${placeholders})`);
      params.push(...organization_ids);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
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
      const query = `UPDATE seat_reservations SET ${keys
        .map((key) => `${key} = ?`)
        .join(", ")} WHERE reservation_id = ?`;
      const result = await runQuery(query, [...values, reservation_id]);

      return result;
    });
  },
  delete: (reservation_id) => {
    return runQuery(`DELETE FROM seat_reservations WHERE reservation_id = ?`, [
      reservation_id,
    ]);
  },
};

export default SeatsReservations;
