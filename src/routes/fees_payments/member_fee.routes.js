import express from "express";
import MemberFeeController from "../../controllers/fees_payments/member_fee.controller.js";
import authenticate from "../../middlewares/authenticate.middleware.js";

const router = express.Router();
router.post("/", authenticate, MemberFeeController.add);
router.get("/", authenticate, MemberFeeController.view);
router.put("/", authenticate, MemberFeeController.update);
router.delete("/", authenticate, MemberFeeController.delete);

export default router;