import express from "express";
import BookCopyController from "../../controllers/library_managment/book_copies.controllers.js";

const router = express.Router();

router.post("/",BookCopyController.add);
router.get("/", BookCopyController.view);
router.put("/", BookCopyController.update); 
router.delete("/", BookCopyController.delete);

export default router;