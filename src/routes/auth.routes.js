import express from "express";

import staffAuthRouter from "../services/auth/staff.auth.js";
import sudentAuthRouter from "../services/auth/student.auth.js";
import adminAuthRouter from "../services/auth/admin.auth.js";
import googleAuthRouter from "../services/auth/google.auth.js";
import forgotPasswordRouter from "../services/auth/forgot_password.auth.js";

const router = express.Router();

router.use("/staff", staffAuthRouter);
router.use("/student", sudentAuthRouter);
router.use("/admin", adminAuthRouter);
router.use("/google",googleAuthRouter);
router.use("/forgot-password",forgotPasswordRouter);

export default router;