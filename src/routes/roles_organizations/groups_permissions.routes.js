import express from "express";
import PermissionGroupController from "../../controllers/roles_persmissions/permissions_groups.controllers.js";
import authenticate from "../../middlewares/authenticate.middleware.js";
import authorize from "../../middlewares/authorize.middlerware.js";
import { GROUP_PERMISSION } from "../../constants/permissions.constants.js";
const router = express.Router();
router.post(
    "/",
    authenticate,
    authorize(GROUP_PERMISSION.ADD_GROUP_PERMISSION.code),
    PermissionGroupController.add
);
router.get(
    "/",
    authenticate,
    authorize(GROUP_PERMISSION.VIEW_GROUP_PERMISSION.code),
    PermissionGroupController.view
);
router.put(
    "/",
    authenticate,
    authorize(GROUP_PERMISSION.EDIT_GROUP_PERMISSION.code),
    PermissionGroupController.update
);
router.delete(
    "/",
    authenticate,
    authorize(GROUP_PERMISSION.DELETE_GROUP_PERMISSION.code),
    PermissionGroupController.delete
);

export default router;