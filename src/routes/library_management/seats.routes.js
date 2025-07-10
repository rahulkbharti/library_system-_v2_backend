import express from "express";
import SeatsController from "../../controllers/library_managment/seats.controllers.js";
import authenticate from "../../middlewares/authenticate.middleware.js";
import authorize from "../../middlewares/authorized.middlerware.js";
import { SEAT } from "../../constants/permissions.constants.js";
const router = express.Router();

router.post("/", authenticate, authorize(SEAT.ADD_SEAT), SeatsController.add);
router.get("/", authenticate, authorize(SEAT.VIEW_SEAT), SeatsController.view);
router.put("/", authenticate, authorize(SEAT.EDIT_SEAT), SeatsController.update);
router.delete("/", authenticate, authorize(SEAT.DELETE_SEAT), SeatsController.delete);

export default router;