import runQuery from "../helper/query.helper.js";
import RunTransaction from "../helper/transactions.helper.js";

const AdminModel = {
    create: (data) => {
        return RunTransaction(async (connection) => {
            const { organization_id, ...userFields } = data;
            const keys = Object.keys(userFields);
            const values = Object.values(userFields);

            if (!keys.length) {
                throw new Error("No user fields provided");
            }

            // 1. Insert into users table
            const [userResult] = await connection.query(
                `INSERT INTO users (${keys.join(", ")}) VALUES (${keys.map(() => "?").join(", ")})`,
                values
            );
            const userId = userResult.insertId;

            // 2. Insert into admins table
            await connection.query(
                "INSERT INTO admins (user_id) VALUES (?)",
                [userId]
            );
            return { user_id: userId, ...userFields }
        });
    },

    view: (email) => {
        const query = email
            ? "SELECT * FROM users u JOIN admins a ON a.user_id = u.user_id WHERE u.email = ?"
            : "SELECT * FROM users u JOIN admins a ON a.user_id = u.user_id";
        
        const params = email ? [email] : [];
        return runQuery(query, params);
    },

    update: (data) => {
        return RunTransaction(async (connection) => {
            const { update, user_id, admin = false } = data;
            const keys = Object.keys(update);
            const values = Object.values(update);

            if (!keys.length) {
                throw new Error("No update fields provided");
            }

            const table = admin ? "admins" : "users";
            const query = `UPDATE ${table} SET ${keys.map(key => `${key} = ?`).join(", ")} WHERE user_id = ?`;
            
            await connection.query(query, [...values, user_id]);

            return update;
        });
    },

    delete: (user_id) => {
        return runQuery(`DELETE FROM users WHERE user_id = ?`, [user_id]);
    },
};

export default AdminModel;