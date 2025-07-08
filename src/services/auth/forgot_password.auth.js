import express from 'express';
import {
  sendOtp,
  verifyOtp,
  resetPassword,
} from './auth.controllers.js'; // Adjust the path as necessary

const router = express.Router();

// OTP Routes
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

// Password Reset Route
router.post('/reset-password', resetPassword);

export default router;