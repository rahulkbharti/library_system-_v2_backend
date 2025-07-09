import express from 'express';
import BoookRouter from './library_management/book.routes.js';

const router = express.Router();

router.use('/book', BoookRouter);


export default router;