import app from "./app.js";
// import runQuery from "./helper/query.helper.js";
// import RunTransaction from "./helper/transactions.helper.js";
import logger from "./utils/logger.js";

// import PG_DB from "./utils/postgreDB.js";

const PORT = process.env.PORT;

// runQuery("DELETE FROM users WHERE user_id = ?",[119]).then((res) => {
//     if(res.error) {
//         console.log("Query failed:", res.error);
//     } else {
//         console.log("Query successful:", res);
//     }
// });
// RunTransaction(async (conn)=>{
//     const [rows] = await conn.query("Select username, email, first_name from users1;");
//     return rows;
// }).then((res) => {
//     if(res.error) {
//         console.error("Transaction failed:", res.error.errno);
//     }
//     else {
//         console.log("Transaction successful:", res);
//     }
// });

// sendOtpEmail("rk2255p@gmail.com", "123456").then((res) => {
//     if(res.error) {
//         console.error("Email sending failed:", res.error);
//     }   else {
//         console.log("Email sent successfully:", res);
//     }
// }).catch((err) => {
//     console.error("Error in sending email:", err);
// });
// sendPasswordResetSuccessEmail("rk2255p@gmail.com").then((res) => {
//     if(res.error) {
//         console.error("Email sending failed:", res.error);
//     }   else {
//         console.log("Email sent successfully:", res);
//     }
// }).catch((err) => {
//     console.error("Error in sending email:", err);
// });


app.listen(PORT,()=>{
    logger.info(`Server running on http://localhost:${PORT}`);
})