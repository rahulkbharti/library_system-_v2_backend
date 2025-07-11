import express from "express";
import GroupController from "../../controllers/roles_persmissions/groups.controllers.js";
import authenticate from "../../middlewares/authenticate.middleware.js";
import authorize from "../../middlewares/authorize.middlerware.js";
import { GROUP } from "../../constants/permissions.constants.js";
const router = express.Router();

router.post("/", authenticate, authorize(GROUP.ADD_GROUP.code), GroupController.add);
router.get("/", authenticate, authorize(GROUP.VIEW_GROUP.code), GroupController.view);
router.put("/", authenticate, authorize(GROUP.EDIT_GROUP.code), GroupController.update);
router.delete("/", authenticate, authorize(GROUP.DELETE_GROUP.code), GroupController.delete);

export default router;