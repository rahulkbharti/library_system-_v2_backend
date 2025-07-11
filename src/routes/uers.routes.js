import express from "express";
import StudentRouter from "./users/student.routes.js";
import StaffRouter from "./users/staff.routes.js";
import AdminRouter from "./users/admin.routes.js";

const router = express.Router();

router.use("/student",StudentRouter);
router.use("/staff",StaffRouter);
router.use("/admin",AdminRouter);

export default router;