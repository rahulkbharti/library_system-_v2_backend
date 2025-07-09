import express from "express";
import SeatReservationController from "../../controllers/library_managment/seat_reservations.contoller.js";
const router = express.Router();

router.post("/", SeatReservationController.add);
router.get("/", SeatReservationController.view);
router.put("/", SeatReservationController.update);
router.delete("/", SeatReservationController.delete);

export default router;