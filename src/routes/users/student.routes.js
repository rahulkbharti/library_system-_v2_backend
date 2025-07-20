import express from "express";
import StudentController from "../../controllers/users/student.controller.js";
import authenticate from "../../middlewares/authenticate.middleware.js";

const router = express.Router();

router.post("/", StudentController.add);
router.get("/", authenticate, StudentController.view);
router.put("/", authenticate, StudentController.update);
router.delete("/", authenticate, StudentController.delete);

export default router;
