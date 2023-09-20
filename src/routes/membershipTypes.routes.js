import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  registerMembershipType,
  getAllMembershipType,
  deleteMembershipType,
  updateMembershipType,
} from "../controllers/membershipType.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { membershipTypeSchema } from "../schemas/membershipType.schema.js";

const router = Router();

//Membership Type
router.post(
  "/membership-type",
  authRequired,
  validateSchema(membershipTypeSchema),
  registerMembershipType
);
router.get("/membership-type", authRequired, getAllMembershipType);
router.delete("/membership-type/:id", authRequired, deleteMembershipType);
router.put(
  "/membership-type/:id",
  authRequired,
  validateSchema(membershipTypeSchema),
  updateMembershipType
);

export default router;
