import express from "express";
import SeatsController from "../../controllers/library_managment/seats.controllers.js";
import authenticate from "../../middlewares/authenticate.middleware.js";
import authorize from "../../middlewares/authorize.middlerware.js";
import { SEAT } from "../../constants/permissions.constants.js";
const router = express.Router();

router.post("/", authenticate, authorize(SEAT.ADD_SEAT.code), SeatsController.add);
router.get("/", authenticate, authorize(SEAT.VIEW_SEAT.code), SeatsController.view);
router.put("/", authenticate, authorize(SEAT.EDIT_SEAT.code), SeatsController.update);
router.delete("/", authenticate, authorize(SEAT.DELETE_SEAT.code), SeatsController.delete);

export default router;