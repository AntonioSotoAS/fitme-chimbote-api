import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  registerClient,
  getAllClientsWithLatestMembership,
  deleteByIdClient,
  getAllClients,
  updateClient,
} from "../controllers/client.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { clientSchema } from "../schemas/client.schema.js";

const router = Router();

//Client
router.post(
  "/client",
  authRequired,
  validateSchema(clientSchema),
  registerClient
);
router.get("/client", authRequired, getAllClients);
router.get("/client", authRequired, getAllClientsWithLatestMembership);
router.delete("/client/:id", authRequired, deleteByIdClient);
router.put(
  "/client//:id",
  authRequired,
  validateSchema(clientSchema),
  updateClient
);

export default router;
