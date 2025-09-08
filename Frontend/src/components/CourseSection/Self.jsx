import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Love() {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    imageUrl: "",
    readUrl: "",
  });

  // 📚 Fetch books
  useEffect(() => {
    fetch("http://localhost:5000/api/Love")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          setBooks([]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // ✍ Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📤 Submit book
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/Love", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      alert("Error uploading book");
      return;
    }
    const newBook = await res.json();
    setBooks([newBook, ...books]);
    setShowForm(false);
    setFormData({ title: "", author: "", description: "", imageUrl: "", readUrl: "" });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#2c0f0f] via-[#431515] to-[#2c0f0f] text-white p-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center relative z-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold drop-shadow-lg flex items-center gap-3">
          <span>❤️</span>
          <span className="bg-gradient-to-r from-yellow-300 via-rose-300 to-amber-200 text-transparent bg-clip-text">
            Love
          </span>
        </h1>

        <div className="flex items-center gap-4">
          {/* Upload Button */}
          <button
            className="bg-gradient-to-r from-amber-400 via-rose-400 to-pink-500 hover:from-pink-500 hover:to-amber-400 text-white px-6 py-2 rounded-xl shadow-lg font-semibold transition-all duration-300 hover:shadow-amber-400/50"
            onClick={() => setShowForm(true)}
          >
            ✨ Upload Book
          </button>

          {/* 🏠 Home Button */}
          <Link
            to="/"
            className="text-3xl hover:scale-110 transition-transform"
            title="Go Home"
          >
            🏠
          </Link>
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-96 border border-amber-400">
            <h2 className="text-2xl font-bold mb-4 text-rose-700">Add New Love Book</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="title"
                placeholder="Book Title"
                value={formData.title}
                onChange={handleChange}
                className="p-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-black"
                required
              />
              <input
                type="text"
                name="author"
                placeholder="Author"
                value={formData.author}
                onChange={handleChange}
                className="p-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-black"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="p-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-black"
                required
              />
              <input
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                value={formData.imageUrl}
                onChange={handleChange}
                className="p-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-black"
              />
              <input
                type="text"
                name="readUrl"
                placeholder="Read Now URL (PDF link)"
                value={formData.readUrl}
                onChange={handleChange}
                className="p-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-black"
              />
              <div className="flex justify-between mt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 text-black hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-400 via-rose-400 to-pink-500 text-white font-semibold shadow hover:from-pink-500 hover:to-amber-400 transition-all"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Book Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-12 relative z-10">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white/10 backdrop-blur-md text-white rounded-2xl shadow-2xl overflow-hidden transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 border border-amber-400/40 flex flex-col"
          >
            {book.imageUrl && (
              <img
                src={book.imageUrl}
                alt={book.title}
                className="h-60 w-full object-cover rounded-t-2xl shadow-md"
              />
            )}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-extrabold bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent drop-shadow">
                  {book.title}
                </h3>
                <p className="text-sm text-rose-200 mb-2">By {book.author}</p>
                <p className="text-sm text-slate-100">{book.description}</p>
              </div>
              {book.readUrl && (
                <a
                  href={book.readUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-gradient-to-r from-amber-400 via-rose-400 to-pink-500 hover:from-pink-500 hover:to-amber-400 text-white text-center py-2 px-5 rounded-xl font-semibold shadow-lg transition-all"
                >
                  📖 Read Now
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
