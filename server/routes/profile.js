import { Router } from "express";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);
router.get("/me", (req, res) => res.json({ user: req.user }));
router.patch("/me", async (req, res) => {
  const allowed = ["fullName", "phone", "location", "occupation", "riskProfile", "investmentHorizon", "primaryGoal"];
  const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
  const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true });
  res.json({ user });
});
export default router;
