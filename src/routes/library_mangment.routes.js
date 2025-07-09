import express from 'express';
import BoookRouter from './library_management/book.routes.js';
import BookCopyRouter from './library_management/book_copies.routes.js';
import SeatsRouter from './library_management/seats.routes.js';
import SeatsReservationsRouter from './library_management/seats_reservations.routes.js';
const router = express.Router();

router.use('/book', BoookRouter);
router.use('/book-copy',BookCopyRouter);
router.use('/seats', SeatsRouter);
router.use('/seats-reservations', SeatsReservationsRouter);

export default router;