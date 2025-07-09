import express from "express";
import BookControllers from "../../controllers/library_managment/book.controllers.js";
const router = express.Router();

router.post("/add", BookControllers.add);
export default router;