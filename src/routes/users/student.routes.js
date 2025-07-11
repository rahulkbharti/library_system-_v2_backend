import express from "express";
import StudentController from "../../controllers/users/student.controller.js";

const router = express.Router();

router.post("/", StudentController.add);
router.get("/", StudentController.view);
router.put("/", StudentController.update);
router.delete("/", StudentController.delete);

export default router;
