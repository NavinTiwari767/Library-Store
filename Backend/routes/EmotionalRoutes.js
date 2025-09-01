import express from "express";
import Emotional from "../models/Emotional.js"; // ✅ Model import sahi

const router = express.Router();

// 📚 Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Emotional.find().sort({ createdAt: -1 }); // ✅ Correct Model
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➕ Add new book
router.post("/", async (req, res) => {
  try {
    const newBook = new Emotional(req.body);
    const savedBook = await newBook.save();
    res.json(savedBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
