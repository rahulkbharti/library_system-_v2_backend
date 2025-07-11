import express from "express";
import AdminController from "../../controllers/users/admin.controller.js";

const router = express.Router();

router.post("/", AdminController.add);
router.get("/", AdminController.view);
router.put("/", AdminController.update);
router.delete("/", AdminController.delete);

export default router;
