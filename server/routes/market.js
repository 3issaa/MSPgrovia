import { Router } from "express";
import { getAlphaQuote, getEgxQuote } from "../services/marketService.js";

const router = Router();
router.get("/alpha/:symbol", async (req, res) => res.json({ quote: await getAlphaQuote(req.params.symbol) }));
router.get("/egx/:symbol", async (req, res) => res.json({ quote: await getEgxQuote(req.params.symbol) }));
export default router;
