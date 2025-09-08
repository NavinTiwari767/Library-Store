import React, { useEffect, useRef, useState } from "react";
import FOG from "vanta/dist/vanta.fog.min";
import * as THREE from "three";
import { Link } from "react-router-dom";

export default function Emotional() {
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

  // ✅ Vanta FOG background setup - Emotional colors
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
          highlightColor: 0xff6b6b, // Soft red/pink
          midtoneColor: 0x74b9ff,   // Soft blue
          lowlightColor: 0x6c5ce7,  // Purple
          baseColor: 0x2d3436,      // Dark charcoal
          blurFactor: 0.6,
          speed: 1.2,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  // ✅ Resize fix
  useEffect(() => {
    const handleResize = () => {
      if (vantaEffect) vantaEffect.resize();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [vantaEffect]);

  // ✅ Fetch books
  useEffect(() => {
    fetch("http://localhost:5000/api/emotional")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          console.error("API did not return an array:", data);
          setBooks([]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // ✅ Input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/emotional", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newBook) => {
        setBooks([newBook, ...books]);
        setFormData({
          title: "",
          author: "",
          description: "",
          imageUrl: "",
          readUrl: "",
        });
        setShowForm(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="relative w-full min-h-screen text-white">
      {/* 🔹 Vanta Background */}
      <div
        ref={vantaRef}
        className="fixed top-0 left-0 w-full h-full -z-20"
      ></div>

      {/* 🔹 Gradient Overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-pink-900/40 -z-10"></div>

      {/* 🔹 Actual Content */}
      <div className="relative z-10 w-full px-4 sm:px-8 py-6 min-h-screen">
        {/* HEADER */}
        <nav className="bg-black bg-opacity-50 backdrop-blur-md rounded-2xl p-4 mb-8 border border-purple-600/30">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center">
              <span className="text-pink-400 mr-3">💖</span>
              <span className="bg-gradient-to-r from-pink-400 to-blue-400 text-transparent bg-clip-text">
                Emotional Books
              </span>
            </h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-gradient-to-r from-pink-600 to-purple-700 hover:from-purple-700 hover:to-pink-600 text-white px-4 py-2 rounded-xl transition-all shadow-md font-semibold"
              >
                {showForm ? "Close" : "+ Add Book"}
              </button>
              <Link
                to="/"
                className="text-2xl text-blue-300 hover:text-white transition-colors"
                title="Go Home"
              >
                🏠
              </Link>
            </div>
          </div>
        </nav>

        {/* TAGLINE */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-pink-200 mb-3">
            Journey Through Emotions
          </h2>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Discover stories that touch the heart and awaken the soul
          </p>
        </div>

        {/* FORM */}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
            <div className="relative bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-md border border-purple-600">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-3 right-4 text-purple-300 hover:text-white text-2xl"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4 text-pink-300">
                Add Emotional Book
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  name="title"
                  placeholder="Book Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="p-2 border border-purple-600 rounded-lg bg-gray-800 text-white placeholder-purple-200"
                  required
                />
                <input
                  type="text"
                  name="author"
                  placeholder="Author"
                  value={formData.author}
                  onChange={handleChange}
                  className="p-2 border border-purple-600 rounded-lg bg-gray-800 text-white placeholder-purple-200"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Emotional Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="p-2 border border-purple-600 rounded-lg bg-gray-800 text-white placeholder-purple-200"
                  rows="3"
                />
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="Image URL"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="p-2 border border-purple-600 rounded-lg bg-gray-800 text-white placeholder-purple-200"
                />
                <input
                  type="text"
                  name="readUrl"
                  placeholder="Read URL"
                  value={formData.readUrl}
                  onChange={handleChange}
                  className="p-2 border border-purple-600 rounded-lg bg-gray-800 text-white placeholder-purple-200"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-pink-600 to-purple-700 hover:from-purple-700 hover:to-pink-600 text-white px-4 py-2 rounded-xl font-semibold mt-2"
                >
                  Save Book
                </button>
              </form>
            </div>
          </div>
        )}

        {/* BOOK CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.length > 0 ? (
            books.map((book) => (
              <div
                key={book._id}
                className="relative bg-gradient-to-br from-purple-900/60 to-pink-900/60 backdrop-blur-md rounded-2xl p-5 shadow-xl hover:scale-105 transition-transform border border-purple-500/30 flex flex-col group"
              >
                <div className="absolute top-4 right-4 text-xl text-pink-300">
                  ✨
                </div>

                {book.imageUrl ? (
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-purple-700 to-pink-700 rounded-xl mb-4 flex items-center justify-center">
                    <span className="text-4xl">📖</span>
                  </div>
                )}

                <div className="flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-white mb-1">
                    {book.title}
                  </h2>
                  <p className="text-sm text-pink-200 mb-3">
                    by {book.author}
                  </p>
                  <p className="text-gray-200 text-sm mb-4 flex-grow line-clamp-3">
                    {book.description}
                  </p>

                  {book.readUrl && (
                    <a
                      href={book.readUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-pink-600 to-purple-700 hover:from-purple-700 hover:to-pink-600 text-white px-4 py-2 rounded-xl text-center font-semibold transition-all transform hover:scale-105"
                    >
                      💖 Read Now
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">😢</div>
              <p className="text-gray-300 text-lg">No emotional books yet.</p>
              <p className="text-gray-400">Add one to start the journey!</p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <footer className="mt-12 text-center text-gray-400">
          <p>💫 Books that make you feel deeply 💫</p>
        </footer>

        {/* Custom CSS */}
        <style>
          {`
            .line-clamp-3 {
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
          `}
        </style>
      </div>
    </div>
  );
}
