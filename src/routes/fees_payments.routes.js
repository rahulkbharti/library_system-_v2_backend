import express from "express";
import FeesRouter from "./fees_payments/fees.routes.js";
import MemberFeeRouter from "./fees_payments/member_fee.routes.js";
import PaymentRouter from "./fees_payments/payment.routes.js";

const router = express.Router();
router.use("/fees", FeesRouter); // Assuming you want to handle fees under the same router
router.use("/member-fee",MemberFeeRouter);
router.use("/payment", PaymentRouter); // Assuming you want to handle payments under the same router

export default router;
