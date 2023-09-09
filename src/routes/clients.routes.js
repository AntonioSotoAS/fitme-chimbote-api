import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  registerClient,
  getAllClientsWithLatestMembership,
  deleteByIdClient,
  getAllClients,
  updateClient,
} from "../controllers/client.controller.js";

const router = Router();

//Client
router.post("/client", authRequired, registerClient);
router.get("/client", authRequired, getAllClients);
router.get("/client", authRequired, getAllClientsWithLatestMembership);
router.delete("/client/:id", authRequired, deleteByIdClient);
router.put("/client//:id", authRequired, updateClient);

export default router;
