import express from "express";
import SeatsController from "../../controllers/library_managment/seats.controllers.js";
const router = express.Router();

router.post("/", SeatsController.add);
router.get("/", SeatsController.view);
router.put("/", SeatsController.update);
router.delete("/", SeatsController.delete);

export default router;