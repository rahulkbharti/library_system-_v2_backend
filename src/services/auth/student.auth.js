import express from "express";
import StudentModel from "../../models/users/student.models.js";
import bcrypt from "bcrypt";    
import logger from "../../utils/logger.js";
import generateTokens from "../../utils/jwt.utils.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const studentData = req.body;

    // Validate required fields
    if (!studentData.email || !studentData.password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // Hash password
    studentData.password = await bcrypt.hash(studentData.password, 10);
    
    const result = await StudentModel.create(studentData);
    if (result.error) {
        return res.status(result.error.status || 500).json(result.error);
    }

    // Remove sensitive data from response
    const { password, ...safeData } = result;
    logger.info(`Student registered: ${studentData.email}`);
    
    return res.status(201).json({
        message: "Student registered successfully",
        data: safeData
    });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const student = await StudentModel.view(email);
    
    if (!student || student.length === 0) {
        logger.warn(`Login attempt for non-existent student: ${email}`);
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const { password: hashedPassword, ...studentData } = student[0];
    const validPassword = await bcrypt.compare(password, hashedPassword);

    if (!validPassword) {
        logger.warn(`Failed login attempt for student: ${email}`);
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = generateTokens(email);
    
    logger.info(`Student login successful: ${email}`);
    return res.status(200).json({
        accessToken,
        refreshToken,
        userData: {
            ...studentData,
            role: "student"
        },
        exp: Date.now() + 30000
    });
});

router.post("/update", async (req, res) => {
    const updateData = req.body;

    if (!updateData.email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const student = await StudentModel.view(updateData.email);
    
    if (!student || student.length === 0) {
        return res.status(404).json({ message: "Student not found" });
    }

    updateData.user_id = student[0].user_id;
    const result = await StudentModel.update(updateData);
    
    if (result.error) {
        return res.status(result.error.status || 500).json(result.error);
    }

    logger.info(`Student updated: ${updateData.email}`);
    return res.status(200).json(result);
});

router.delete("/logout", (req, res) => {
    const { id } = req.query;
    logger.info(`Student with ID ${id} logged out`);
    return res.status(200).json({ message: "Logout successful" });
});

export default router;