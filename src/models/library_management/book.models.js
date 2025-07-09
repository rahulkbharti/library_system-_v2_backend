import runQuery from "../../helper/query.helper.js";
import RunTransaction from "../../helper/transactions.helper.js";

const BooksModel = {
    create : (data)=>{
        return RunTransaction(async (connection) => {
            const { organization_id, ...bookFields } = data;
            const keys = Object.keys(bookFields);
            const values = Object.values(bookFields);

            if (!keys.length) {
                throw new Error("No book fields provided");
            }
            // 1. Insert into books table
            const query1 = `INSERT INTO books (${keys.join(", ")}) VALUES (${keys.map(() => "?").join(", ")})`;
            const bookResult = await runQuery(query1, values);
            const bookId = bookResult.insertId;

            // 2. Insert into organizations_books table
            const query2 = "INSERT INTO organizations_books (book_id, organization_id) VALUES (?, ?)";
            await runQuery(query2, [bookId, organization_id]);
            
            return { book_id: bookId, ...bookFields };
        });
        
    },

}

export default BooksModel;