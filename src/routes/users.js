import { Router } from "express"

// Controllers
import userController from "../controllers/userController.js"

const router = Router()

router.get("/:id", userController.get)
router.get("/", userController.current)

export default router
