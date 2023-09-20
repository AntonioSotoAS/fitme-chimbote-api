import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  registerRol,
  deleteRol,
  getAllRol,
  updateRol,
} from "../controllers/role.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { roleSchema } from "../schemas/role.schema.js";

const router = Router();

//Role
router.post("/role", authRequired, validateSchema(roleSchema), registerRol);
router.get("/role", authRequired, getAllRol);
router.delete("/role/:id", authRequired, deleteRol);
router.put("/role/:id", authRequired, validateSchema(roleSchema), updateRol);

export default router;
