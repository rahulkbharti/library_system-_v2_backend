import express from "express";
import logger from "../../utils/logger.js";
import StudentModel from "../../models/student.models.js";
import StaffModel from "../../models/staffs.models.js";
import AdminModel from "../../models/admin.models.js";
import verifyGoogleToken from "../../utils/google.utils.js";
import generateTokens from "../../utils/jwt.utils.js";

const router = express.Router();

const AccountSetup = async (req, res, next) => {
    const { access_token, role, organization_id} = req.body; // student, staff, admin
    if (!access_token || (role && !["student", "staff", "admin"].includes(role))) {
        return res.status(400).json({ error: "Access token and role required" });
    }
    const { full_name, verified_email, picture, ...userInfo } = await verifyGoogleToken(access_token);
    userInfo.password = "Not_Set"; // Ensure password is not included in userInfo
    userInfo.username = userInfo.email.split("@")[0]; // Extract username from email
    userInfo.phone = null; // Set is_active to true by default

    if (role === "student") {
        req.model = StudentModel;
        // userInfo.enrollment_number = 23123434122; // Example enrollment number
        userInfo.organization_id = organization_id;
        req.userInfo = userInfo;
    } else if (role === "staff") {
        req.model = StaffModel;
        userInfo.organization_id = organization_id;;
        req.userInfo = userInfo;
    } else if (role === "admin") {
        req.model = AdminModel;
        req.userInfo = userInfo;
    } else {
        return res.status(400).json({ error: "Invalid role specified" });
    }
    next();
}

// Can Handle Bothe User Registration and Update
router.post("/continue", AccountSetup, async (req, res) => {
    const { userInfo, model } = req; // student, staff, admin
    const user = await req.model.view(userInfo.email);
    // console.log("User Info:", user);
    if (user.length > 0) {
        // Generate tokens and return response
        const { accessToken, refreshToken } = generateTokens(user.email);
        const { password, ...userData } = user[0];

        logger.info(`User ${user.email} logged in successfully`);
        res.json({
            accessToken,
            refreshToken,
            userData: {
                ...userData,
                role: req.body.role || "user" // Ensure role is included in userData
            },
            exp: Date.now() + 30000
        });
    } else {
        // Register if new user
        const result = await model.create(userInfo);
        if (!result || result.error) {
            if(result && result.error.errno === 1062) {
                logger.error(`Failed to register user: This email is already registered as Different Role Try Login in by changing the role`);
                return res.status(409).json({ message: "This email is already registered as Different Role Try Login in by changing the role" });
            }
            return res.status(500).json(result.error || { message: "Failed to register user" });
        }
        const { accessToken, refreshToken } = generateTokens(userInfo.email);
        const { password, ...userData } = userInfo;

        logger.info(`User ${userInfo.email} registered successfully`);
        res.json({
            accessToken,
            refreshToken,
            userData: {
                ...userData,
                role: req.body.role || "user" // Ensure role is included in userData
            },
            exp: Date.now() + 30000
        });
    }
});


export default router;

