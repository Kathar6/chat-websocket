import { Router } from "express"

// Validators
import validateLoginSchema from "../validators/login.js"

// Controllers
import authController from "../controllers/authController.js"

const router = Router()

router.post("/login", validateLoginSchema, authController.login)
router.post("/register", validateLoginSchema, authController.register)

export default router
