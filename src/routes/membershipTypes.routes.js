import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  registerMembershipType,
  getAllMembershipType,
  deleteMembershipType,
  updateMembershipType,
} from "../controllers/membershipType.controller.js";

const router = Router();

//Membership Type
router.post("/membership-type", authRequired, registerMembershipType);
router.get("/membership-type", authRequired, getAllMembershipType);
router.delete("/membership-type/:id", authRequired, deleteMembershipType);
router.put("/membership-type/:id", authRequired, updateMembershipType);

export default router;
