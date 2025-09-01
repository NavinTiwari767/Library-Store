import React, { useEffect, useRef, useState } from "react";
import VANTA from "vanta/dist/vanta.net.min";
import * as THREE from "three";
import { Link } from "react-router-dom"; // ✅ IMPORT LINK

export default function Love() {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    imageUrl: "",
    readUrl: "",
  });

  // Vanta.js background
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        VANTA({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xff004c, // Changed color for a love theme
          backgroundColor: 0x1a000a, // Changed color for a love theme
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  // Fetch books
  useEffect(() => {
    fetch("http://localhost:5000/api/Love")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit new book
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
    <div
      ref={vantaRef}
      className="relative min-h-screen bg-zinc-900 text-white p-4 sm:p-6 overflow-hidden font-sans"
    >
      {/* Header */}
      {/* ✅ UPDATED HEADER FOR RESPONSIVENESS */}
      <div className="flex justify-between items-center relative z-10">
        <h1 className="text-2xl sm:text-4xl font-bold drop-shadow-md flex items-center gap-2">
          <span>❤️</span>
          <span className="bg-gradient-to-r from-red-400 to-pink-400 text-transparent bg-clip-text">
            Love Books
          </span>
        </h1>
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500 text-white text-xs sm:text-base px-3 py-1.5 sm:px-6 sm:py-2 rounded-lg sm:rounded-xl shadow-lg font-semibold transition-all"
            onClick={() => setShowForm(true)}
          >
            Upload
          </button>
          <Link to="/" className="text-2xl sm:text-3xl text-gray-300 hover:text-white transition-colors" title="Go to Home">
            🏠
          </Link>
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4">
          {/* ✅ UPDATED MODAL FOR RESPONSIVENESS */}
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md border border-pink-300">
            {/* ✅ ADDED CLOSE 'X' BUTTON */}
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-800 text-3xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-pink-700">Add New Book</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text" name="title" placeholder="Book Title" value={formData.title} onChange={handleChange}
                className="p-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-black" required
              />
              <input
                type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange}
                className="p-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-black" required
              />
              <textarea
                name="description" placeholder="Description" value={formData.description} onChange={handleChange}
                className="p-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-black" required
              />
              <input
                type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange}
                className="p-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-black"
              />
              <input
                type="text" name="readUrl" placeholder="Read Now URL (PDF link)" value={formData.readUrl} onChange={handleChange}
                className="p-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-black"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow hover:from-pink-500 hover:to-red-500 transition-all"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Book Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mt-12 relative z-10">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-zinc-800 bg-opacity-50 backdrop-blur-sm text-white rounded-2xl shadow-xl overflow-hidden hover:scale-[1.03] transition-transform border border-pink-500/20 flex flex-col"
          >
            {book.imageUrl && (
              <img
                src={book.imageUrl}
                alt={book.title}
                className="h-48 w-full object-cover"
              />
            )}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl lg:text-2xl font-extrabold text-pink-300">
                  {book.title}
                </h3>
                <p className="text-sm text-pink-200 mb-2">By {book.author}</p>
                <p className="text-sm text-slate-200">{book.description}</p>
              </div>
              {book.readUrl && (
                <a
                  href={book.readUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-gradient-to-r from-red-500 to-pink-600 hover:from-pink-600 hover:to-red-600 text-white text-center py-2 px-4 rounded-xl font-semibold shadow-lg transition-all"
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