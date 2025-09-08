import User from "../models/user.model.js";

// Add a book for a student
export const addBook = async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, author, isbn } = req.body;
    
    const user = await User.findById(userId);
    
    if (!user || user.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }
    
    user.books.push({ title, author, isbn });
    await user.save();
    
    res.status(201).json({ message: "Book added successfully", books: user.books });
  } catch (error) {
    console.error("Add Book Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all books for a student
export const getStudentBooks = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId);
    
    if (!user || user.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }
    
    res.status(200).json({ books: user.books });
  } catch (error) {
    console.error("Get Books Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a book for a student
export const deleteBook = async (req, res) => {
  try {
    const { userId, bookId } = req.params;
    
    const user = await User.findById(userId);
    
    if (!user || user.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }
    
    // Convert bookId to string for comparison
    user.books = user.books.filter(book => book._id.toString() !== bookId);
    await user.save();
    
    res.status(200).json({ message: "Book deleted successfully", books: user.books });
  } catch (error) {
    console.error("Delete Book Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};