import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const SECRET_KEY = process.env.SECRET_KEY || "access-secret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "refresh-secret";
const TOKEN_EXPIRY = "30s";
const REFRESH_EXPIRY = "1d";

// Helper functions
const generateTokens = (email, organization_id = null, role = null) => {
  const accessToken = jwt.sign({ email, organization_id, role}, SECRET_KEY, {
    expiresIn: TOKEN_EXPIRY,
  });
  // TODO: If you login on different device with same email may problem , because with same email same refresh token will generate and may casuses problem in storing in database;
  const refreshToken = jwt.sign({ email, organization_id, role }, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRY,
  });
  // refreshTokens.push(refreshToken);
  return { accessToken, refreshToken };
};
// Regenerate Access Token using Refresh Token
export const regenerateTokens = (refreshToken) => {
  // console.log("Regenerating tokens...",refreshToken);
  if (!refreshToken) {
    return { error: "Refresh token required" };
  }

  return jwt.verify(refreshToken, REFRESH_SECRET, (err, decoded) => {
    if (err) return { error: "Token verification failed" };
    // console.log("Decoded Refresh Token", decoded);
    const accessToken = jwt.sign(
      { email: decoded.email, organization_id: decoded.organization_id, role: decoded.role },
      SECRET_KEY,
      {
        expiresIn: TOKEN_EXPIRY,
      }
    );
    // console.log("Generated Access Token", accessToken);
    return {
      accessToken,
      exp: Date.now() + 30000,
    };
  });
};

export default generateTokens;
