import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function requireAuth(req, res, next) {
  try {
    const token = req.headers.authorization?.startsWith("Bearer ") && req.headers.authorization.slice(7);
    if (!token) return res.status(401).json({ message: "Authentication required." });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload.sub).select("-passwordHash");
    if (!req.user) return res.status(401).json({ message: "User no longer exists." });
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token." });
  }
}
