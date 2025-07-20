import express from "express";
import FeesController from "../../controllers/fees_payments/fees.controller.js";
import authenticate from "../../middlewares/authenticate.middleware.js";

const router = express.Router();
router.post("/", authenticate, FeesController.add);
router.get("/", authenticate, FeesController.view);
router.put("/", authenticate, FeesController.update);
router.delete("/", authenticate, FeesController.delete);

export default router;