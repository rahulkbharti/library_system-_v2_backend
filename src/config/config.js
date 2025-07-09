import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve('.env.development');
console.log('Loading env from:', envPath);

// load env
const result = dotenv.config({
    path: envPath,
    debug: true
});

// // DEBUG 3: show dotenv load result
// console.log("dotenv result:", result);

// finally
console.log("DB_HOST =", process.env.DB_HOST);