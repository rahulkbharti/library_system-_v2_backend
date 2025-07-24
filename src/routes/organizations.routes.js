import express from "express";
import OrganizationController from "../controllers/organizations/organizations.contollers.js";
import authenticate from "../middlewares/authenticate.middleware.js";
const router = express.Router();

router.post("/", authenticate, OrganizationController.add);
router.get("/", OrganizationController.view);
router.put("/", authenticate, OrganizationController.update);
router.delete("/", authenticate, OrganizationController.delete);

export default router;
