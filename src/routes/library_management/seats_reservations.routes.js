import express from "express";
import SeatReservationController from "../../controllers/library_managment/seat_reservations.contoller.js";
import authenticate from "../../middlewares/authenticate.middleware.js";
const router = express.Router();

router.post("/",authenticate, SeatReservationController.add);
router.get("/", authenticate, SeatReservationController.view);
router.put("/",authenticate, SeatReservationController.update);
router.delete("/",authenticate, SeatReservationController.delete);

export default router;