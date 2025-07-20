import express from "express";
import StaffController from "../../controllers/users/staff.controller.js";
import authenticate from "../../middlewares/authenticate.middleware.js";

const router = express.Router();

router.post("/", authenticate, StaffController.add);
router.get("/", authenticate, StaffController.view);
router.put("/", authenticate, StaffController.update);
router.delete("/", authenticate, StaffController.delete);

export default router;
