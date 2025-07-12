import express from "express";
import PaymentController from "../../controllers/fees_payments/payment.controller.js";

const router = express.Router();

router.post("/", PaymentController.add);
router.get("/", PaymentController.view);
router.put("/", PaymentController.update);
router.delete("/", PaymentController.delete);

export default router;