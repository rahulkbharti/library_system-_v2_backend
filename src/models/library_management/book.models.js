import runQuery from "../../helper/query.helper.js";
import RunTransaction from "../../helper/transactions.helper.js";

const BooksModel = {
    create : (data)=>{
        const keys = Object.keys(data);
        const values = Object.values(data);
        const query = `INSERT INTO books (${keys.join(", ")}) VALUES (${keys.map(() => "?").join(", ")})`;
        return runQuery(query, values);
    },
    view: (book_id) => {
        const query = book_id
            ? "SELECT * FROM books WHERE book_id = ?"
            : "SELECT * FROM books";
        
        const params = book_id ? [book_id] : [];
        return runQuery(query, params);
    },
    update: (data) => {
        return RunTransaction(async (connection) => {
            const { update, book_id } = data;
            const keys = Object.keys(update);
            const values = Object.values(update);

            if (!keys.length) {
                throw new Error("No update fields provided");
            }
            const query = `UPDATE books SET ${keys.map(key => `${key} = ?`).join(", ")} WHERE book_id = ?`;
            const result = await runQuery(query, [...values, book_id]);

            return result;
        });
    },
    delete: (book_id) => {
        return runQuery(`DELETE FROM books WHERE book_id = ?`, [book_id]);
    }
}

export default BooksModel;