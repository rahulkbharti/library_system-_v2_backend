import express from "express";
import BookControllers from "../../controllers/library_managment/book.controllers.js";
const router = express.Router();

router.post("/", BookControllers.add);
router.get("/", BookControllers.view);
router.put("/", BookControllers.update); 
router.delete("/", BookControllers.delete);

export default router;