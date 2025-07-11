import express from "express";
import StaffController from "../../controllers/users/staff.controller.js";

const router = express.Router();

router.post("/", StaffController.add);
router.get("/", StaffController.view);
router.put("/", StaffController.update);
router.delete("/", StaffController.delete);

export default router;
