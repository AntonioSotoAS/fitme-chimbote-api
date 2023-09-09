import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  registerShift,
  deleteShift,
  getAllShift,
  updateShift,
} from "../controllers/shift.controller.js";

const router = Router();

//Shift
router.post("/shift", authRequired, registerShift);
router.get("/shift", authRequired, getAllShift);
router.delete("/shift/:id", authRequired, deleteShift);
router.put("/shift/:id", authRequired, updateShift);

export default router;
