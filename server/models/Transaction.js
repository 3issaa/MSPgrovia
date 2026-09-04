import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  type: { type: String, enum: ["deposit", "withdrawal", "transfer", "buy", "sell", "dividend"], required: true },
  title: { type: String, required: true, trim: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: "EGP" },
  category: { type: String, default: "General" },
  occurredAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema);
