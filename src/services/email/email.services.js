import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({
    path: `/.env.${process.env.NODE_ENV || 'development'}`,
});

// console.log('Environment:', process.env.SMTP_HOST, process.env.SMTP_PORT, process.env.SMTP_USER);
// Email configuration constants
const EMAIL_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true', // Convert string to boolean
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

// Email content defaults
const DEFAULT_EMAIL_OPTIONS = {
  from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
};

/**
 * Send an email using nodemailer
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text content
 * @param {string} options.html - HTML content
 * @returns {Promise<Object>} Nodemailer response
 */
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    // 1. Create reusable transporter object
    const transporter = nodemailer.createTransport(EMAIL_CONFIG);

    // 2. Send mail with defined transport object
    const info = await transporter.sendMail({
      ...DEFAULT_EMAIL_OPTIONS,
      to,
      subject,
      text,
      html,
    });

    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    return error; // Re-throw to allow caller to handle
  }
};

/**
 * Send OTP email
 * @param {string} to - Recipient email
 * @param {string} otp - OTP code
 * @returns {Promise<Object>} Email sending result
 */
export const sendOtpEmail = async (to, otp) => {
  const transporter = nodemailer.createTransport(EMAIL_CONFIG);
  const mailOptions = {
    from: DEFAULT_EMAIL_OPTIONS.from,
    to,
    subject: 'Your OTP Code',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Password Reset Request</h2>
        <p>Your OTP code for password reset is:</p>
        <div style="background: #f3f4f6; padding: 10px 15px; display: inline-block; 
                   border-radius: 4px; font-size: 24px; font-weight: bold; letter-spacing: 2px;">
          ${otp}
        </div>
        <p style="margin-top: 20px;">This code will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

/**
 * Send password reset success email
 * @param {string} to - Recipient email
 * @returns {Promise<Object>} Email sending result
 */
export const sendPasswordResetSuccessEmail = async (to) => {
  const transporter = nodemailer.createTransport(EMAIL_CONFIG);
  const mailOptions = {
    from: DEFAULT_EMAIL_OPTIONS.from,
    to,
    subject: 'Password Changed Successfully',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Password Updated</h2>
        <p>Your password has been successfully changed.</p>
        <p>If you didn't make this change, please contact our support team immediately.</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};


// // Example usage
// const sendTestEmail = async () => {
//   try {
//     await sendEmail({
//       to: 'recipient@example.com',
//       subject: 'Hello ✔',
//       text: 'Hello world?',
//       html: '<b>Hello world?</b>',
//     });
//   } catch (error) {
//     console.error('Failed to send test email:', error);
//   }
// };

// // Only run if this is the main module (not when imported)
// if (import.meta.url === `file://${process.argv[1]}`) {
//   sendTestEmail();
// }

export default sendEmail;