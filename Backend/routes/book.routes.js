import express from "express";
import { addBook, getStudentBooks, deleteBook } from "../controller/book.controller.js";

const router = express.Router();

router.post("/:userId/books", addBook);
router.get("/:userId/books", getStudentBooks);
router.delete("/:userId/books/:bookId", deleteBook);

export default router;