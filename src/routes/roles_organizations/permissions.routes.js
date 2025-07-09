import express from "express";
import PermissionController from "../../controllers/roles_persmissions/permissions.contollers.js";

const router = express.Router();

router.post("/", PermissionController.add);
router.get("/", PermissionController.view);
router.put("/", PermissionController.update);
router.delete("/", PermissionController.delete);

export default router;