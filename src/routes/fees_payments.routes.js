import express from "express";
import MonthlyFeeRouter from "./fees_payments/monthly_fees.routes.js";

const router = express.Router();
router.use("/monthly", MonthlyFeeRouter);

export default router;
