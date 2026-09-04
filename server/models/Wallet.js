import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  currency: { type: String, default: "EGP" },
  availableBalance: { type: Number, default: 45210.49, min: 0 },
  investedBalance: { type: Number, default: 79110.91, min: 0 },
  linkedAccounts: [{ bankName: String, accountType: String, last4: String }],
}, { timestamps: true });

export default mongoose.model("Wallet", walletSchema);
