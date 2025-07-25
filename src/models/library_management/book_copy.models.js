import runQuery from "../../helper/query.helper.js";
import RunTransaction from "../../helper/transactions.helper.js";

const BookCopyModel = {
  create: (data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const query = `INSERT INTO book_copies (${keys.join(", ")}) VALUES (${keys
      .map(() => "?")
      .join(", ")})`;
    // console.log("BookCopyModel.create query:", query, "values:", values);
    return runQuery(query, values);
  },
  view: (copy_id, organization_ids = []) => {
    let query = `
        SELECT book_copies.*, books.title as book_title 
        FROM book_copies 
        INNER JOIN books ON book_copies.book_id = books.book_id
    `;
    const params = [];
    const conditions = [];

    if (copy_id) {
      conditions.push("copy_id = ?");
      params.push(copy_id);
    }

    if (organization_ids.length > 0) {
      // Create placeholders for each organization_id
      const placeholders = organization_ids.map(() => "?").join(",");
      conditions.push(`organization_id IN (${placeholders})`);
      params.push(...organization_ids);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY book_copies.copy_id DESC";
    // console.log("BookCopyModel.view query:", query, "params:", params);
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
      const query = `UPDATE book_copies SET ${keys
        .map((key) => `${key} = ?`)
        .join(", ")} WHERE copy_id = ?`;
      const result = await runQuery(query, [...values, copy_id]);

      return result;
    });
  },
  delete: (copy_id) => {
    return runQuery(`DELETE FROM book_copies WHERE copy_id = ?`, [copy_id]);
  },
};

export default BookCopyModel;
