import mongoose from "mongoose";

const SelfSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  readUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Self", SelfSchema);
