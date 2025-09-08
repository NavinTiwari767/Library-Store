import React, { useState, useEffect, useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Link } from "react-router-dom";

export default function Holy() {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    imageUrl: "",
    readUrl: "",
  });

  // Particles init
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Fetch books
  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));
  }, []);

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const newBook = await res.json();
    setBooks([...books, newBook]);
    setShowForm(false);
    setFormData({ title: "", author: "", description: "", imageUrl: "", readUrl: "" });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0a192f] via-[#0d1b2a] to-[#1b263b] text-white p-4 sm:p-6 overflow-hidden">
      {/* ✨ Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          particles: {
            color: { value: ["#ffffff", "#93c5fd", "#e5e7eb"] }, // white, light blue, silver
            shape: { type: ["circle", "star"] },
            opacity: { value: 0.4 },
            size: { value: { min: 2, max: 6 } },
            move: { enable: true, speed: 0.8, outModes: { default: "bounce" } },
            number: { value: 60, density: { enable: true, area: 900 } },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
            modes: { repulse: { distance: 120, duration: 0.4 } },
          },
        }}
        className="absolute inset-0 -z-10"
      />

      {/* Header */}
      <div className="flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/"
            className="text-2xl sm:text-3xl text-gray-300 hover:text-white transition-colors"
          >
            &larr;
          </Link>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-wide text-blue-300 flex items-center gap-2">
            ✝️ Holy Books
          </h1>
        </div>
        <button
          className="bg-gradient-to-r from-blue-400 to-indigo-600 hover:from-blue-500 hover:to-indigo-700 text-white text-xs sm:text-base px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-lg font-semibold transition-transform hover:scale-105"
          onClick={() => setShowForm(true)}
        >
          Upload
        </button>
      </div>

      {/* Upload Form (Modal) */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
          <div className="relative bg-gradient-to-br from-white/10 to-blue-200/10 backdrop-blur-xl text-black rounded-2xl shadow-2xl p-6 w-full max-w-md border border-blue-400/30">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-4 text-gray-700 hover:text-black text-3xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Book</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input type="text" name="title" placeholder="Book Title" value={formData.title} onChange={handleChange} className="p-2 border rounded-lg" required />
              <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} className="p-2 border rounded-lg" required />
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="p-2 border rounded-lg" required />
              <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} className="p-2 border rounded-lg" />
              <input type="text" name="readUrl" placeholder="Read URL" value={formData.readUrl} onChange={handleChange} className="p-2 border rounded-lg" />
              <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-indigo-600 text-white font-semibold hover:scale-105 transition">
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Book Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 relative z-10">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-gradient-to-br from-white/10 to-blue-200/5 backdrop-blur-xl border border-blue-400/20 text-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-blue-400/40 transition-transform flex flex-col relative"
          >
            {/* ✨ Small light blue cross icon */}
            <div className="absolute top-3 right-3 text-blue-300">
              ✝️
            </div>

            {book.imageUrl && (
              <img src={book.imageUrl} alt={book.title} className="h-48 w-full object-cover" />
            )}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-serif font-bold text-blue-300">{book.title}</h3>
              <p className="text-sm text-gray-300">By {book.author}</p>
              <p className="mt-2 text-gray-100 flex-grow">{book.description}</p>
              {book.readUrl && (
                <a
                  href={book.readUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-center bg-gradient-to-r from-blue-400 to-indigo-600 hover:from-blue-500 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                >
                  Read Now
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
