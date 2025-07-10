import express from "express";
import MonthlyFeesController from "../../controllers/fees_payments/monthly_fees.controllers.js";
import authenticate from "../../middlewares/authenticate.middleware.js";
const router = express.Router();
router.post("/",authenticate, MonthlyFeesController.add);
router.get("/",authenticate, MonthlyFeesController.view);
router.put("/",authenticate, MonthlyFeesController.update);
router.delete("/", authenticate, MonthlyFeesController.delete);
export default router;