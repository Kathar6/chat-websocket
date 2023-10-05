import { Router } from "express";

// Validators
import validateLoginSchema from "../validators/login.js";
import validateRegisterSchema from "../validators/register.js";

// Controllers
import authController from "../controllers/auth.js";

const router = Router();

/**
 * Login
 * @openapi
 * /api/login:
 *    post:
 *      tags:
 *        - Authentication
 *      description: Login the user with user and password
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/login"
 *      responses:
 *        '200':
 *          description: Set a http only cookie
 *        '401':
 *          description: User not exists or Invalid credentials
 *        '400':
 *          description: Error.
 */
router.post("/login", validateLoginSchema, authController.login);

/**
 * Register
 * @openapi
 * /api/register:
 *    post:
 *      tags:
 *        - Authentication
 *      description: Register the user
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/register"
 *      responses:
 *        '200':
 *          description: Register the user in the DB and let him be able to log in
 *        '400':
 *          description: Error.
 */
router.post("/register", validateRegisterSchema, authController.register);

export default router;
