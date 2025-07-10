import { describe, expect, it } from "vitest";
import Permissions from "../middlewares/permissions.middleware";

describe("Checking Permissions", () => {
    it("Permissions for user", async () => {
        const email = "testuser@example.com";
        const permissions = await Permissions(email);
        console.log(permissions)
        // Example assertion: next should be called if permission granted
        expect(permissions).toBe(true);
    });
});