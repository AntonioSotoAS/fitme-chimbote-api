import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import clientRoutes from "./routes/clients.routes.js";
import membershipRoutes from "./routes/memberships.routes.js";
import membershipTypeRoutes from "./routes/membershipTypes.routes.js";
import roleRoutes from "./routes/roles.routes.js";
import shiftRoutes from "./routes/shifts.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/", authRoutes);
app.use("/api/v1/", clientRoutes);
app.use("/api/v1/", membershipRoutes);
app.use("/api/v1/", membershipTypeRoutes);
app.use("/api/v1/", roleRoutes);
app.use("/api/v1/", shiftRoutes);

export default app;
