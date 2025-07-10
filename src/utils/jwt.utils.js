import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config({
    path: `.env.${process.env.NODE_ENV || 'development'}`,
});

const SECRET_KEY = process.env.SECRET_KEY || "access-secret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "refresh-secret";
const TOKEN_EXPIRY =  "30s";
const REFRESH_EXPIRY =  "1d";

// Helper functions
const generateTokens = (email,organization_id=null) => {
    const accessToken = jwt.sign({email,organization_id}, SECRET_KEY, { expiresIn: TOKEN_EXPIRY });
    // TODO: If you login on different device with same may problem , because with same email same refresh token will generate and may casuses problem in storing in database;
    const refreshToken = jwt.sign({email,organization_id}, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRY });
    // refreshTokens.push(refreshToken);
    return { accessToken, refreshToken };
};

export default generateTokens;