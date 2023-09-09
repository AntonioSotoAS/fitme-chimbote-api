import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();
//User
router.post("/user/register", register);
router.post("/user/login", login);
router.post("/user/logout", logout);

//get profile
router.get("/profile", authRequired, profile);

export default router;
