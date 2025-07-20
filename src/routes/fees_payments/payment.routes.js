import express from "express";
import PaymentController from "../../controllers/fees_payments/payment.controller.js";
import authenticate from "../../middlewares/authenticate.middleware.js";

const router = express.Router();

router.post("/", authenticate, PaymentController.add);
router.get("/", authenticate, PaymentController.view);
router.put("/", authenticate, PaymentController.update);
router.delete("/", authenticate, PaymentController.delete);

export default router;