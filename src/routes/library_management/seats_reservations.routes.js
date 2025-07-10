import express from "express";
import SeatReservationController from "../../controllers/library_managment/seat_reservations.contoller.js";
import authenticate from "../../middlewares/authenticate.middleware.js";
import authorize from "../../middlewares/authorized.middlerware.js";
import { SEAT_RESERVATION } from "../../constants/permissions.constants.js";
const router = express.Router();
router.post(
    "/",
    authenticate,
    authorize(SEAT_RESERVATION.ADD_SEAT_RESERVATION.code),
    SeatReservationController.add
);
router.get(
    "/",
    authenticate,
    authorize(SEAT_RESERVATION.VIEW_SEAT_RESERVATION.code),
    SeatReservationController.view
);
router.put(
    "/",
    authenticate,
    authorize(SEAT_RESERVATION.EDIT_SEAT_RESERVATION.code),
    SeatReservationController.update
);
router.delete(
    "/",
    authenticate,
    authorize(SEAT_RESERVATION.DELETE_SEAT_RESERVATION.code),
    SeatReservationController.delete
);

export default router;