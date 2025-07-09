import express from "express";
import bcrypt from "bcrypt";
import StaffModel from "../../models/users/staffs.models.js";
import logger from "../../utils/logger.js";
import generateTokens from "../../utils/jwt.utils.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const staffData = req.body;

    // Validate required fields
    if (!staffData.email || !staffData.password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    staffData.password = await bcrypt.hash(staffData.password, 10);
    const result = await StaffModel.create(staffData);
    
    if (result.error) {
        return res.status(result.error.status || 500).json(result.error);
    }

    // Remove sensitive data from response
    const { password, ...safeData } = result;
    return res.status(201).json({
        message: "Staff registered successfully",
        data: safeData
    });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const staff = await StaffModel.view(email);
    
    if (!staff || staff.length === 0) {
        logger.warn(`Login attempt for non-existent staff: ${email}`);
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const { password: hashedPassword, ...staffData } = staff[0];
    const validPassword = await bcrypt.compare(password, hashedPassword);

    if (!validPassword) {
        logger.warn(`Failed login attempt for staff: ${email}`);
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = generateTokens(email);
    
    return res.status(200).json({
        accessToken,
        refreshToken,
        userData: {
            ...staffData,
            role: "staff"
        },
        exp: Date.now() + 30000
    });
});

router.post("/update", async (req, res) => {
    const updateData = req.body;

    if (!updateData.email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const staff = await StaffModel.view(updateData.email);
    
    if (!staff || staff.length === 0) {
        return res.status(404).json({ message: "Staff not found" });
    }

    updateData.user_id = staff[0].user_id;
    const result = await StaffModel.update(updateData);
    
    if (result.error) {
        return res.status(result.error.status || 500).json(result.error);
    }

    return res.status(200).json(result);
});

router.delete("/logout", (req, res) => {
    const { id } = req.query;
    logger.info(`Staff with ID ${id} logged out`);
    return res.status(200).json({ message: "Logout successful" });
});

export default router;