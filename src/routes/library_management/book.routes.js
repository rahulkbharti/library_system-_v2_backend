import express from "express";
import BookControllers from "../../controllers/library_managment/book.controllers.js";
import authenticate from "../../middlewares/authenticate.middleware.js";

const router = express.Router();

router.post("/",authenticate, BookControllers.add);
router.get("/",authenticate, BookControllers.view);
router.put("/",authenticate, BookControllers.update);
router.delete("/",authenticate, BookControllers.delete);

export default router;