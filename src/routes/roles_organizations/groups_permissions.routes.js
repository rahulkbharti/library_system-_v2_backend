import express from "express";
import PermissionGroupController from "../../controllers/roles_persmissions/permissions_groups.controllers.js";
import authenticate from "../../middlewares/authenticate.middleware.js";
const router = express.Router();

router.post("/",authenticate, PermissionGroupController.add);
router.get("/",authenticate, PermissionGroupController.view);
router.put("/",authenticate, PermissionGroupController.update);  
router.delete("/",authenticate, PermissionGroupController.delete);

export default router;