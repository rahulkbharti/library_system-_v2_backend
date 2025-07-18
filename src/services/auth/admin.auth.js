import express from "express";
import bcrypt from "bcrypt";
import AdminModel from "../../models/users/admin.models.js";
import logger from "../../utils/logger.js";
import generateTokens from "../../utils/jwt.utils.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const adminData = req.body;
    
    // Validate required fields
    if (!adminData.email || !adminData.password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // Hash password
    adminData.password = await bcrypt.hash(adminData.password, 10);
    
    const result = await AdminModel.create(adminData);
    console.log("Admin Creation Result:", result);
    if (result.error) {
        // TODO: Handle specific error cases
        return res.status(500).json(result.error);
    }

    // Remove sensitive data from response
    const { password, ...safeData } = result;
    
    return res.status(201).json({
        message: "Admin registered successfully",
        data: safeData
    });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await AdminModel.view(email);
    // console.log("Admin Data:", admin);
    
    if (!admin || admin.length === 0) {
        logger.warn(`Login attempt for non-existent admin: ${email}`);
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const { password: hashedPassword, ...adminData } = admin[0];
    const validPassword = await bcrypt.compare(password, hashedPassword);

    if (!validPassword) {
        logger.warn(`Failed login attempt for admin: ${email}`);
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = generateTokens(email,0,"admin");
    
    return res.status(200).json({
        accessToken,
        refreshToken,
        userData: {
            ...adminData,
            role: "admin"
        },
        exp: Date.now() + 30000
    });
});

router.post("/update", async (req, res) => {
    const data = req.body;
    
    if (!data.email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const admin = await AdminModel.view(data.email);
    
    if (!admin || admin.length === 0) {
        return res.status(404).json({ message: "Admin not found" });
    }

    data.user_id = admin[0].user_id;
    const result = await AdminModel.update(data);
    
    if (result.error) {
        return res.status(500).json(result.error);
    }

    return res.status(200).json(result);
});

router.delete("/logout", (req, res) => {
    const { id } = req.query;
    logger.info(`Admin with ID ${id} logged out`);
    return res.status(200).json({ message: "Logout successful" });
});

export default router;