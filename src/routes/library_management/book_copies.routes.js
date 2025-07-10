import express from "express";
import BookCopyController from "../../controllers/library_managment/book_copies.controllers.js";
import authenticate from "../../middlewares/authenticate.middleware.js";

const router = express.Router();

router.post("/", authenticate, BookCopyController.add);
router.get("/",authenticate, BookCopyController.view);
router.put("/",authenticate, BookCopyController.update); 
router.delete("/",authenticate, BookCopyController.delete);

export default router;