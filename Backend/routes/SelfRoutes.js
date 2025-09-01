import express from "express";
import Self from "../models/Self.js";

const router = express.Router();

// 📚 Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Self.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➕ Add new book
router.post("/", async (req, res) => {
  try {
    const { title, author, description, imageUrl, readUrl } = req.body;
    const book = new Self({ title, author, description, imageUrl, readUrl });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
