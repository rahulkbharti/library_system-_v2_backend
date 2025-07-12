import express from "express";
import MemberFeeController from "../../controllers/fees_payments/member_fee.controller.js";

const router = express.Router();
router.post("/", MemberFeeController.add);
router.get("/", MemberFeeController.view);
router.put("/", MemberFeeController.update);
router.delete("/", MemberFeeController.delete);

export default router;