import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  membershipRegister,
  getAllMembership,
  deleteMembership,
  updateMembership,
} from "../controllers/membership.controller.js";

const router = Router();

//Membership
router.post("/membership", authRequired, membershipRegister);
router.get("/membership", authRequired, getAllMembership);
router.delete("/membership/:id", authRequired, deleteMembership);
router.put("/membership/:id", authRequired, updateMembership);

export default router;
