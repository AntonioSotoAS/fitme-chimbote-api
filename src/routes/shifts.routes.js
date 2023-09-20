import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  registerShift,
  deleteShift,
  getAllShift,
  updateShift,
} from "../controllers/shift.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { shiftSchema } from "../schemas/shift.schema.js";

const router = Router();

//Shift
router.post("/shift", authRequired, validateSchema(shiftSchema), registerShift);
router.get("/shift", authRequired, getAllShift);
router.delete("/shift/:id", authRequired, deleteShift);
router.put(
  "/shift/:id",
  authRequired,
  validateSchema(shiftSchema),
  updateShift
);

export default router;
