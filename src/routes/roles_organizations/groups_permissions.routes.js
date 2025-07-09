import express from "express";
import PermissionGroupController from "../../controllers/roles_persmissions/permissions_groups.controllers.js";
const router = express.Router();

router.post("/", PermissionGroupController.add);
router.get("/", PermissionGroupController.view);
router.put("/", PermissionGroupController.update);  
router.delete("/", PermissionGroupController.delete);

export default router;