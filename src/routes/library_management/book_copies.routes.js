import express from "express";
import BookCopyController from "../../controllers/library_managment/book_copies.controllers.js";
import authenticate from "../../middlewares/authenticate.middleware.js";
import authorize from "../../middlewares/authorize.middlerware.js";
import { BOOK_COPY } from "../../constants/permissions.constants.js";

const router = express.Router();

router.post("/", authenticate, authorize(BOOK_COPY.ADD_BOOK_COPY.code), BookCopyController.add);
router.get("/", authenticate, authorize(BOOK_COPY.VIEW_BOOK_COPY.code), BookCopyController.view);
router.put("/", authenticate, authorize(BOOK_COPY.EDIT_BOOK_COPY.code), BookCopyController.update);
router.delete("/", authenticate, authorize(BOOK_COPY.DELETE_BOOK_COPY.code), BookCopyController.delete);

export default router;