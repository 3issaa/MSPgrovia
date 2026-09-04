import mongoose from "mongoose";

const holdingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  symbol: { type: String, required: true, uppercase: true },
  name: { type: String, required: true },
  market: { type: String, enum: ["EGX", "US", "OTHER"], default: "EGX" },
  quantity: { type: Number, required: true, min: 0 },
  averageCost: { type: Number, required: true, min: 0 },
  currency: { type: String, default: "EGP" },
}, { timestamps: true });

holdingSchema.index({ user: 1, symbol: 1 }, { unique: true });
export default mongoose.model("Holding", holdingSchema);
