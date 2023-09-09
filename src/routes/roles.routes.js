import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  registerRol,
  deleteRol,
  getAllRol,
  updateRol,
} from "../controllers/role.controller.js";

const router = Router();

//Role
router.post("/role", authRequired, registerRol);
router.get("/role", authRequired, getAllRol);
router.delete("/role/:id", authRequired, deleteRol);
router.put("/role/:id", authRequired, updateRol);

export default router;
