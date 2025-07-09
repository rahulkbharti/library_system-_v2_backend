import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import StudentModel from '../../models/users/student.models.js';
import StaffModel from '../../models/users/staffs.models.js';
import AdminModel from '../../models/users/admin.models.js';

import { sendOtpEmail, sendPasswordResetSuccessEmail } from '../../services/email/email.services.js';
import logger from '../../utils/logger.js';

// In-memory store for OTPs (replace with Redis or DB in production)
const otpStore = new Map();
const resetTokens = new Map();

// Generate a 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();
// const generateOtp = () => 123456;

/**
 * Controller to send OTP
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 */
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    // console.log("sendOtp called with email:", email);

    // Validate email
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Generate OTP
    const otp = generateOtp();
    const otpId = uuidv4();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    // Store OTP
    otpStore.set(otpId, {
      email,
      otp,
      expiresAt,
      attempts: 0,
    });

    // Send email
    await sendOtpEmail(email, otp);
    logger.info(`Sending OTP ${otp} to ${email} otpID: ${otpId}`);
  

    res.status(200).json({ 
      success: true,
      message: 'OTP sent successfully',
      otpId, // Send this to client for verification
    });
  } catch (error) {
    logger.error('Error sending OTP');
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

/**
 * Controller to verify OTP
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 */
export const verifyOtp = async (req, res) => {
    // console.log("verifyOtp called with body:", req.body);
  try {
    const { otpId, otp, email } = req.body;
    // console.log("verifyOtp called with otpId:", otpId, "otp:", otp, "email:", email);
    // Validate inputs
    if (!otpId || !otp || !email) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Get OTP data
    const otpData = otpStore.get(otpId);
    // console.log("OTP Data:", otpStore,otpData);

    // Check if OTP exists and matches email
    if (!otpData || otpData.email !== email) {
      return res.status(400).json({ error: 'Invalid OTP request' });
    }

    // Check expiry
    if (new Date() > otpData.expiresAt) {
      otpStore.delete(otpId);
      return res.status(400).json({ error: 'OTP has expired' });
    }

    // Check attempts
    if (otpData.attempts >= 3) {
      otpStore.delete(otpId);
      return res.status(400).json({ error: 'Too many attempts' });
    }

    // Verify OTP
    if (otpData.otp != otp) {
      otpData.attempts += 1;
      otpStore.set(otpId, otpData);
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // OTP is valid - generate reset token
    const resetToken = uuidv4();
    resetTokens.set(resetToken, {
      email,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes expiry
    });

    // Clean up OTP
    otpStore.delete(otpId);
    logger.info(`OTP verified for ${email}, resetToken: ${resetToken}`);
    res.status(200).json({ 
      success: true,
      message: 'OTP verified successfully',
      resetToken,
    });
  } catch (error) {
    logger.error('Error verifying OTP:');
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
};

/**
 * Controller to reset password
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 */
export const resetPassword = async (req, res) => {
  try {
    const { newPassword, resetToken } = req.body;
    // console.log(resetToken,newPassword,resetTokens);
    // Validate inputs
    if (!resetToken || !newPassword) {
      logger.warn("Reset token or new password is missing");
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check password length
    if (newPassword.length < 6) {
      logger.warn("Password length error");
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    // Get reset token data
    const tokenData = resetTokens.get(resetToken);

    // Check if token exists
    if (!tokenData) {
      logger.warn("Invalid or expired token");
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Check expiry
    if (new Date() > tokenData.expiresAt) {
      logger.warn("Token has expired");
      resetTokens.delete(resetToken);
      return res.status(400).json({ error: 'Token has expired' });
    }

    const result = await ChangePassword(tokenData.email,newPassword);
    
    logger.info("Result of ChangePassword:");
    // Clean up token
    resetTokens.delete(resetToken);

    if(result.success === false){
      res.status(400).json(result);
      logger.info(`Password reset failed for ${tokenData.email}: ${result.message}`);
    }
    await sendPasswordResetSuccessEmail(tokenData.email);
    logger.info(`Password reset successful for ${tokenData.email}`);
    res.status(200).json(result);

  } catch (error) {
    logger.error(`Error resetting password`);
    console.error(error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
};

const ChangePassword = async (email,password) => {
  try{
     const student = await StudentModel.view(email);
     if(student && student.length > 0) {
          const studentData = student[0];
          if(studentData.password) {
              const isMatch = await bcrypt.compare(password, studentData.password);
              if(isMatch) {
                  return { success: false, message: "New password cannot be same as old password" };
              }
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          // console.log("Student Data",studentData)
          const update = {update: {password: hashedPassword}, user_id: studentData.user_id};
          await StudentModel.update(update);
          return { success: true, message: "Password changed successfully" };
     }
     const staff = await StaffModel.view(email);
      if(staff && staff.length > 0) {
            const staffData = staff[0];
            if(staffData.password) {
                const isMatch = await bcrypt.compare(password, staffData.password);
                if(isMatch) {
                    return { success: false, message: "New password cannot be same as old password" };
                }
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            // console.log("Staff Data",staffData);
            const update = {update: {password: hashedPassword}, user_id: staffData.user_id};
            await StaffModel.update(update);
            return { success: true, message: "Password changed successfully" };
      }
      const admin = await AdminModel.view(email);
      if(admin && admin.length > 0) {
            const adminData = admin[0];
            if(adminData.password) {
                const isMatch = await bcrypt.compare(password, adminData.password);
                if(isMatch) {
                    return { success: false, message: "New password cannot be same as old password" };
                }
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            // console.log("Admin Data",adminData);
            const update = {update: {password: hashedPassword}, user_id: adminData.user_id};
            await AdminModel.update(update);
            return { success: true, message: "Password changed successfully" };
      }}
  catch (error) {
    logger.error('Error changing password');
    return { success: false, message: 'Failed to change password' };
  }
};