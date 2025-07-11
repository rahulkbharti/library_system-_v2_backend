import express from "express";
import BookControllers from "../../controllers/library_managment/book.controllers.js";
import authenticate from "../../middlewares/authenticate.middleware.js";
import authorize from "../../middlewares/authorize.middlerware.js";
import { BOOK } from "../../constants/permissions.constants.js";
const router = express.Router();

router.post("/", authenticate, authorize(BOOK.ADD_BOOK.code), BookControllers.add);
router.get("/", authenticate, authorize(BOOK.VIEW_BOOK.code), BookControllers.view);
router.put("/", authenticate, authorize(BOOK.EDIT_BOOK.code), BookControllers.update);
router.delete("/", authenticate, authorize(BOOK.DELETE_BOOK.code), BookControllers.delete);

export default router;