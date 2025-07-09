import express from "express";
import GroupController from "../../controllers/roles_persmissions/groups.controllers.js";
const router = express.Router();

router.post("/", GroupController.add);
router.get("/", GroupController.view);
router.put("/", GroupController.update);
router.delete("/", GroupController.delete);

export default router;