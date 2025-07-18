import express from "express";

import staffAuthRouter from "../services/auth/staff.auth.js";
import sudentAuthRouter from "../services/auth/student.auth.js";
import adminAuthRouter from "../services/auth/admin.auth.js";
import googleAuthRouter from "../services/auth/google.auth.js";
import forgotPasswordRouter from "../services/auth/forgot_password.auth.js";
import { regenerateTokens } from "../utils/jwt.utils.js";

const router = express.Router();

router.use("/staff", staffAuthRouter);
router.use("/student", sudentAuthRouter);
router.use("/admin", adminAuthRouter);
router.use("/google",googleAuthRouter);
router.use("/forgot-password",forgotPasswordRouter);
// Refresh Token for all 
router.post("/refresh-token",async (req,res)=>{
    const {refreshToken } = req.body;
    // console.log("Getting Regenerate Token",refreshToken);
    const result = await regenerateTokens(refreshToken);
    if(!result || result.error) return res.status(403).json(result);

   res.status(200).json({
        accessToken: result.accessToken,
        exp: result.exp
    });
})

export default router;