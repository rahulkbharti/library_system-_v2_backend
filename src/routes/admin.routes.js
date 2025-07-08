import express from "express";
const router = express.Router();
import AdminControllers from "../controllers/admin.controllers.js";

router.post('/register',AdminControllers.register);
// router.post('/login', AdminControllers.login);
router.get('/view', AdminControllers.view);
router.put('/update', AdminControllers.update);
router.delete('/delete', AdminControllers.delete);

export default router;