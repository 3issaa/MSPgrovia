import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Wallet from "../models/Wallet.js";

const router = Router();
const tokenFor = (user) => jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

router.post("/register", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password || password.length < 8) return res.status(400).json({ message: "Name, email, and a password of at least 8 characters are required." });
  if (await User.exists({ email: email.toLowerCase() })) return res.status(409).json({ message: "An account already uses this email." });
  const user = await User.create({ fullName, email, passwordHash: await bcrypt.hash(password, 12) });
  await Wallet.create({ user: user.id });
  res.status(201).json({ token: tokenFor(user), user });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email?.toLowerCase() }).select("+passwordHash");
  if (!user || !(await bcrypt.compare(password || "", user.passwordHash))) return res.status(401).json({ message: "Incorrect email or password." });
  res.json({ token: tokenFor(user), user: user.toJSON() });
});

export default router;
