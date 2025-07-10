import express from "express";
import GroupController from "../../controllers/roles_persmissions/groups.controllers.js";
import authenticate from "../../middlewares/authenticate.middleware.js";

const router = express.Router();

router.post("/",authenticate, GroupController.add);
router.get("/",authenticate, GroupController.view);
router.put("/",authenticate, GroupController.update);
router.delete("/",authenticate, GroupController.delete);

export default router;