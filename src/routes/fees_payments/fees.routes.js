import express from "express";
import FeesController from "../../controllers/fees_payments/fees.controller.js";

const router = express.Router();
router.post("/", FeesController.add);
router.get("/", FeesController.view);
router.put("/", FeesController.update);
router.delete("/", FeesController.delete);

export default router;