import { describe, expect, it } from "vitest";
import dotenv from 'dotenv';

dotenv.config({
    path: `.env.development`,
});

describe("Database Configuration", () => {
    describe("Environment Variables", () => {
        it("should load environment variables from .env.development", () => {
            expect(process.env.DB_HOST).toBeDefined();
            expect(process.env.DB_USER).toBeDefined();
            expect(process.env.DB_PASSWORD).toBeDefined();
            expect(process.env.DB_DATABASE).toBeDefined();
        });
    });
    describe("Database Connection", () => {
        it("should connect to the database using the loaded environment variables", async () => {
            const mysql = require('mysql2/promise');
            const connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE
            });

            expect(connection).toBeDefined();
            await connection.end();
        });
    }); 
    
});
