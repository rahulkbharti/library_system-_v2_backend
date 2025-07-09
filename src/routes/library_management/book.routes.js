import express from "express";
import BookControllers from "../../controllers/library_managment/book.controllers.js";
const router = express.Router();

router.post("/add", BookControllers.add);
router.get("/books", BookControllers.view);
router.put("/update", BookControllers.update); 
router.delete("/", BookControllers.delete);

export default router;