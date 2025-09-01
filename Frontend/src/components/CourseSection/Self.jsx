import React, { useEffect, useRef, useState } from "react";
import VANTA from "vanta/dist/vanta.net.min";
import * as THREE from "three";
import { Link } from "react-router-dom"; // 👈 Add this for Home button

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

  // 🎨 Vanta background
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
          color: 0x9333ea,
          backgroundColor: 0x0f172a,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  // 📚 Fetch books
  useEffect(() => {
    fetch("http://localhost:5000/api/Love")
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response (Love):", data);
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
    setBooks([newBook, ...books]); // 👈 Naya book add karo
    setShowForm(false);
    setFormData({ title: "", author: "", description: "", imageUrl: "", readUrl: "" });
  };

  return (
    <div
      ref={vantaRef}
      className="relative min-h-screen bg-zinc-900 text-white p-6 overflow-hidden font-sans"
    >
      {/* Header */}
      <div className="flex justify-between items-center relative z-10">
        <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-md flex items-center gap-3">
          <span>❤️</span>
          <span className="bg-gradient-to-r from-pink-400 to-red-400 text-transparent bg-clip-text">
            Love
          </span>
        </h1>

        <div className="flex items-center gap-4">
          {/* Upload Button */}
          <button
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 text-white px-6 py-2 rounded-xl shadow-lg font-semibold transition-all duration-200"
            onClick={() => setShowForm(true)}
          >
            Upload Book
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-96 border border-pink-300">
            <h2 className="text-2xl font-bold mb-4 text-pink-700">Add New Love Book</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="title"
                placeholder="Book Title"
                value={formData.title}
                onChange={handleChange}
                className="p-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-black placeholder-gray-500"
                required
              />
              <input
                type="text"
                name="author"
                placeholder="Author"
                value={formData.author}
                onChange={handleChange}
                className="p-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-black placeholder-gray-500"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="p-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-black placeholder-gray-500"
                required
              />
              <input
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                value={formData.imageUrl}
                onChange={handleChange}
                className="p-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-black placeholder-gray-500"
              />
              <input
                type="text"
                name="readUrl"
                placeholder="Read Now URL (PDF link)"
                value={formData.readUrl}
                onChange={handleChange}
                className="p-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-black placeholder-gray-500"
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
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow hover:from-red-500 hover:to-pink-500 transition-all"
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
            className="bg-zinc-800 text-white rounded-2xl shadow-xl overflow-hidden hover:scale-[1.03] transition-transform border border-pink-500/20 flex flex-col"
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
                <h3 className="text-2xl font-extrabold text-pink-300">
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
                  className="mt-4 inline-block bg-gradient-to-r from-pink-500 to-red-600 hover:from-red-600 hover:to-pink-600 text-white text-center py-2 px-4 rounded-xl font-semibold shadow-lg transition-all"
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
