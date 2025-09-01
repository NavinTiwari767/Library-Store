import React, { useEffect, useRef, useState } from "react";
import FOG from "vanta/dist/vanta.fog.min";
import * as THREE from "three";
import { Link } from "react-router-dom";

export default function Philosophy() {
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

  // Vanta.js Fog Background
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0x9333ea, // purple highlight
          midtoneColor: 0x4f46e5,   // indigo mid
          lowlightColor: 0x1e1b4b,  // dark violet
          baseColor: 0x0f172a,      // near-black
          blurFactor: 0.7,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  // Fetch books
  useEffect(() => {
    fetch("http://localhost:5000/api/philosophy")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/philosophy", {
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
      className="relative min-h-screen text-white p-4 sm:p-6 overflow-hidden font-sans"
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50 -z-10"></div>

      {/* Header */}
      <div className="flex justify-between items-center relative z-10">
        <h1 className="text-2xl sm:text-4xl font-bold drop-shadow-md flex items-center gap-2">
          <span>📚</span>
          <span className="bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
            Philosophy
          </span>
        </h1>
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white text-xs sm:text-base px-3 py-1.5 sm:px-6 sm:py-2 rounded-lg sm:rounded-xl shadow-lg font-semibold transition-all"
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
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md border border-purple-300">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-800 text-3xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-purple-700">Add New Book</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input type="text" name="title" placeholder="Book Title" value={formData.title} onChange={handleChange} className="p-2 border border-purple-200 rounded-lg text-black" required />
              <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} className="p-2 border border-purple-200 rounded-lg text-black" required />
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="p-2 border border-purple-200 rounded-lg text-black" required />
              <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} className="p-2 border border-purple-200 rounded-lg text-black" />
              <input type="text" name="readUrl" placeholder="Read Now URL" value={formData.readUrl} onChange={handleChange} className="p-2 border border-purple-200 rounded-lg text-black" />
              <div className="flex justify-end mt-2">
                <button type="submit" className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow hover:from-indigo-500 hover:to-purple-500 transition-all">
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
          <div key={book._id} className="bg-zinc-800 text-white rounded-2xl shadow-xl overflow-hidden hover:scale-[1.03] transition-transform border border-purple-500/20 flex flex-col">
            {book.imageUrl && <img src={book.imageUrl} alt={book.title} className="h-48 w-full object-cover" />}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl lg:text-2xl font-extrabold text-purple-300">{book.title}</h3>
                <p className="text-sm text-purple-200 mb-2">By {book.author}</p>
                <p className="text-sm text-slate-200">{book.description}</p>
              </div>
              {book.readUrl && (
                <a href={book.readUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-center py-2 px-4 rounded-xl font-semibold shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all">
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
