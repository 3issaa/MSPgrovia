import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true, select: false },
  phone: { type: String, default: "" },
  location: { type: String, default: "" },
  occupation: { type: String, default: "" },
  investorSince: { type: Date, default: Date.now },
  riskProfile: { type: String, enum: ["Conservative", "Balanced", "Growth"], default: "Balanced" },
  investmentHorizon: { type: String, default: "5-10 years" },
  primaryGoal: { type: String, default: "Long-term growth" },
}, { timestamps: true, toJSON: { transform: (_, result) => { delete result.passwordHash; return result; } } });

export default mongoose.model("User", userSchema);
