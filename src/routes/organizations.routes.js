import express from "express";
import OrganizationController from "../controllers/organizations/organizations.contollers.js";
const router = express.Router();

router.post("/", OrganizationController.add);
router.get("/", OrganizationController.view);
router.put("/", OrganizationController.update);
router.delete("/", OrganizationController.delete);

export default router;