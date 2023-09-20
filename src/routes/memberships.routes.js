import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  membershipRegister,
  getAllMembership,
  deleteMembership,
  updateMembership,
} from "../controllers/membership.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { membershipSchema } from "../schemas/membership.schema.js";

const router = Router();

//Membership
router.post(
  "/membership",
  authRequired,
  validateSchema(membershipSchema),
  membershipRegister
);
router.get("/membership", authRequired, getAllMembership);
router.delete("/membership/:id", authRequired, deleteMembership);
router.put(
  "/membership/:id",
  authRequired,
  validateSchema(membershipSchema),
  updateMembership
);

export default router;
