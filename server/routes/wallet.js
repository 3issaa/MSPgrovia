import { Router } from "express";
import Wallet from "../models/Wallet.js";
import Transaction from "../models/Transaction.js";
import Holding from "../models/Holding.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router(); router.use(requireAuth);
router.get("/", async (req, res) => {
  const [wallet, transactions, holdings] = await Promise.all([Wallet.findOne({ user: req.user.id }), Transaction.find({ user: req.user.id }).sort({ occurredAt: -1 }).limit(20), Holding.find({ user: req.user.id })]);
  res.json({ wallet, transactions, holdings, portfolioValue: holdings.reduce((sum, item) => sum + item.quantity * item.averageCost, 0) });
});
router.post("/transactions", async (req, res) => {
  const { type, title, amount, category, occurredAt } = req.body;
  if (!type || !title || !Number.isFinite(Number(amount))) return res.status(400).json({ message: "type, title, and numeric amount are required." });
  const transaction = await Transaction.create({ user: req.user.id, type, title, amount: Number(amount), category, occurredAt });
  res.status(201).json({ transaction });
});
export default router;
