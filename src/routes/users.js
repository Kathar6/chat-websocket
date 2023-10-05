import { Router } from "express";

// Middlewares
import authMiddleware from "../middleware/auth.js";

// Controllers
import userController from "../controllers/user.js";

const router = Router();
router.use(authMiddleware);

router.get("/:id", userController.get);
/**
 * Current User
 * @openapi
 * /api/user:
 *    get:
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Users
 *      description: Get the current user information
 *      responses:
 *        '200':
 *          description: Get the current information
 *        '401':
 *          description: Not valid authentication
 *        '400':
 *          description: Error.
 */
router.get("/", userController.current);

export default router;
