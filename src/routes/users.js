import { Router } from "express";

// Middlewares
import authMiddleware from "../middleware/auth.js";

// Controllers
import userController from "../controllers/userController.js";

const router = Router();
router.use(authMiddleware);

router.get("/:id", userController.get);
router.get("/", userController.current);

export default router;
