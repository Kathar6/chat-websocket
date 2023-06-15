import { Router } from "express";

// Validators
import validateLoginSchema from "../validators/login.js";
import validateRegisterSchema from "../validators/register.js";

// Controllers
import authController from "../controllers/auth.js";

const router = Router();

router.post("/login", validateLoginSchema, authController.login);
router.post("/register", validateRegisterSchema, authController.register);

export default router;
