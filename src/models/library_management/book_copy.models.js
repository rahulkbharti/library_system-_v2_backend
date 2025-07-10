import runQuery from "../../helper/query.helper.js";
import RunTransaction from "../../helper/transactions.helper.js";

const BookCopyModel = {
    create: (data) => {
        const keys = Object.keys(data);
        const values = Object.values(data);
        const query = `INSERT INTO book_copies (${keys.join(", ")}) VALUES (${keys.map(() => "?").join(", ")})`;
        return runQuery(query, values);
    },
    view: (copy_id, organization_id = null) => {
        let query = "SELECT * FROM book_copies";
        const params = [];

        if (copy_id || organization_id) {
            query += " WHERE";

            if (copy_id) {
                query += " copy_id = ?";
                params.push(copy_id);
            }

            if (organization_id) {
                if (copy_id) query += " AND";
                query += " organization_id = ?";
                params.push(organization_id);
            }
        }

        return runQuery(query, params);
    },
    update: (data) => {
        return RunTransaction(async (connection) => {
            const { update, copy_id } = data;
            const keys = Object.keys(update);
            const values = Object.values(update);

            if (!keys.length) {
                throw new Error("No update fields provided");
            }
            const query = `UPDATE book_copies SET ${keys.map(key => `${key} = ?`).join(", ")} WHERE copy_id = ?`;
            const result = await runQuery(query, [...values, copy_id]);

            return result;
        });
    },
    delete: (copy_id) => {
        return runQuery(`DELETE FROM book_copies WHERE copy_id = ?`, [copy_id]);
    }
}

export default BookCopyModel;