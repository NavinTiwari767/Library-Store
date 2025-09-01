import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  readUrl: { type: String }, // 📖 Read Now link
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Book", bookSchema);
