import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
  verifyToken,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();
//User
router.post("/user/register", validateSchema(registerSchema), register);
router.post("/user/login", validateSchema(loginSchema), login);
router.post("/user/logout", logout);

//get profile
router.get("/verify", verifyToken);
router.get("/profile", authRequired, profile);

export default router;
