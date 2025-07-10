import express from "express";
import SeatsController from "../../controllers/library_managment/seats.controllers.js";
import authenticate from "../../middlewares/authenticate.middleware.js";
import authorize from "../../middlewares/authorized.middlerware.js";

const router = express.Router();

router.post("/",authenticate, SeatsController.add);
router.get("/",authenticate, authenticate, authorize("VIEW_SEATS"), SeatsController.view);
router.put("/",authenticate, SeatsController.update);
router.delete("/",authenticate, SeatsController.delete);

export default router;