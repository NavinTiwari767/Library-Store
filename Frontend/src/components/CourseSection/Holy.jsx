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
    readUrl: "", // ✅ Add readUrl field
  });

  // Particles init
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Fetch books from API
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
    <div className="relative min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white p-4 sm:p-6 overflow-hidden">
      {/* Background Animation */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: { enable: true, mode: "repulse" },
            },
            modes: {
              push: { quantity: 4 },
              repulse: { distance: 100, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "#ffffff" },
            links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.5, width: 1 },
            collisions: { enable: true },
            move: { enable: true, speed: 2, outModes: { default: "bounce" } },
            number: { value: 50, density: { enable: true, area: 800 } },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 5 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 -z-10"
      />

      {/* Header */}
      <div className="flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/" className="text-2xl sm:text-3xl text-gray-400 hover:text-white transition-colors">
            &larr;
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold">📚 Holy Books</h1>
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 text-white text-xs sm:text-base px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl shadow-md font-semibold"
          onClick={() => setShowForm(true)}
        >
          Upload
        </button>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4">
          <div className="relative bg-white text-black rounded-2xl shadow-xl p-6 w-full max-w-md">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-4 text-gray-400 hover:text-gray-800 text-3xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Add New Book</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text" name="title" placeholder="Book Title"
                value={formData.title} onChange={handleChange}
                className="p-2 border rounded-lg" required
              />
              <input
                type="text" name="author" placeholder="Author"
                value={formData.author} onChange={handleChange}
                className="p-2 border rounded-lg" required
              />
              <textarea
                name="description" placeholder="Description"
                value={formData.description} onChange={handleChange}
                className="p-2 border rounded-lg" required
              />
              <input
                type="text" name="imageUrl" placeholder="Image URL"
                value={formData.imageUrl} onChange={handleChange}
                className="p-2 border rounded-lg"
              />
              {/* ✅ New Read URL Field */}
              <input
                type="text" name="readUrl" placeholder="Read URL"
                value={formData.readUrl} onChange={handleChange}
                className="p-2 border rounded-lg"
              />
              <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white">
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
            className="bg-white text-black rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform flex flex-col"
          >
            {book.imageUrl && (
              <img
                src={book.imageUrl} alt={book.title}
                className="h-48 w-full object-cover"
              />
            )}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-bold">{book.title}</h3>
              <p className="text-sm text-gray-600">By {book.author}</p>
              <p className="mt-2 text-gray-800 flex-grow">{book.description}</p>
              {book.readUrl && (
                <a
                  href={book.readUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold"
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
