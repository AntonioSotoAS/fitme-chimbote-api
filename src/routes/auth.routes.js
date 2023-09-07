import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { registerRol } from "../controllers/role.controller.js";
import { registerShift } from "../controllers/shift.controller.js";
import { registerMembershipType } from "../controllers/membershipType.controller.js";
import { registerClient, getAllClientsWithLatestMembership } from "../controllers/client.controller.js";
import { registerMembership } from "../controllers/membership.controller.js";

const router = Router();
//User
router.post("/user/register", register);
router.post("/user/login", login);

//Role
router.post("/role", registerRol);

//Shift
router.post("/shift", registerShift);

//Membership Type
router.post("/membership-type", registerMembershipType);

//Client
router.post("/client", registerClient);
router.get("/client", getAllClientsWithLatestMembership);


//Membership
router.post("/membership", registerMembership);







export default router;
