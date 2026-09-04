import dotenv from "dotenv";
import dns from "node:dns";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDatabase } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import walletRoutes from "./routes/wallet.js";
import marketRoutes from "./routes/market.js";
import { errorHandler, notFound } from "./middleware/errors.js";

dotenv.config({ path: "server/.env" });

if (process.env.DNS_SERVERS) {
	dns.setServers(process.env.DNS_SERVERS.split(",").map((server) => server.trim()).filter(Boolean));
}

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));
app.get("/api/health", (req, res) => res.json({ status: "ok", timestamp: new Date().toISOString() }));
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/market", marketRoutes);
app.use(notFound); app.use(errorHandler);

connectDatabase().then(() => app.listen(process.env.PORT || 5000, () => console.log(`API running on http://localhost:${process.env.PORT || 5000}`))).catch((error) => { console.error("Database connection failed:", error.message); process.exit(1); });
