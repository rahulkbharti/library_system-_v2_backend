// import dotenv from 'dotenv';
import { describe, expect, it } from 'vitest';
import db from '../../utils/db.js';
import dotenv from "dotenv";
dotenv.config({
    path: `/.env.development`,
});

describe("Testing Environement Variables",()=>{
    it("The Host Name should be Truthy",()=>{
        expect(process.env.DB_HOST).toBeTruthy();
    })
})