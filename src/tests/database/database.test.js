import { describe, expect, it } from "vitest";
import db from "../../utils/db.js"
import dotenv from 'dotenv';

dotenv.config({
    path: `/.env.development`,
});
// backend\.env.development
console.log(process.env.DB_HOST);

describe("Testing Data Base Connection",()=>{
    it("Shoid ",()=>{
        // expect()
    })
})