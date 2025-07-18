import { describe, expect, it } from "vitest";
import generateTokens from "../../utils/jwt.utils";

describe("Tesing Generate Jwt tokens",()=>{
    it("rk2255p@gmail.com should be created jwt", ()=>{
        const tokens = generateTokens("rk2255p@gmail.com", "organization_id", "admin");
        expect(tokens).toBeTruthy();
    })
})