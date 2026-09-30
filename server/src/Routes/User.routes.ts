import { Router } from "express";
import { allUser, authUser, login, logout, register } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.post('/register', register)
router.post('/logout',logout)
router.post('/login', login)
router.post('/auth-user',verifyJWT, authUser)
router.get('/all-user',allUser)

export default router