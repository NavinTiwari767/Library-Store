import React, { useEffect, useRef, useState } from "react";
import FOG from "vanta/dist/vanta.fog.min";   // 🔄 Fog background
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

  // ✅ Vanta FOG background setup
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
          highlightColor: 0xf43f5e, // pink (highlight)
          midtoneColor: 0x6366f1,   // indigo (study feel)
          lowlightColor: 0x0f172a,  // deep dark blue
          baseColor: 0x111827,      // dark gray/black
          blurFactor: 0.5,
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
    <div
      ref={vantaRef}
      className="w-full text-white relative"
      style={{ minHeight: "100vh", height: "100%" }}
    >
      {/* ✅ Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60 h-full w-full"></div>

      <div className="relative z-10 w-full px-6 sm:px-12 py-8">
        {/* ✅ HEADER */}
        <header className="w-full flex justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold flex items-center gap-2">
            📚 <span>Emotional Books</span>
          </h1>
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-pink-600 hover:bg-pink-700 text-white text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl transition-all"
            >
              {showForm ? "Close Form" : "➕ Add Book"}
            </button>
            <Link
              to="/"
              className="text-2xl sm:text-3xl text-gray-300 hover:text-white"
              title="Go Home"
            >
              🏠
            </Link>
          </div>
        </header>

        {/* ✅ FORM */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 bg-opacity-90 p-6 rounded-xl shadow-lg mb-6 max-w-2xl mx-auto"
          >
            <input
              type="text"
              name="title"
              placeholder="Book Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full mb-3 p-2 rounded bg-gray-800 text-white placeholder-gray-400"
              required
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
              className="w-full mb-3 p-2 rounded bg-gray-800 text-white placeholder-gray-400"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full mb-3 p-2 rounded bg-gray-800 text-white placeholder-gray-400"
              rows="3"
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full mb-3 p-2 rounded bg-gray-800 text-white placeholder-gray-400"
            />
            <input
              type="text"
              name="readUrl"
              placeholder="Read URL"
              value={formData.readUrl}
              onChange={handleChange}
              className="w-full mb-3 p-2 rounded bg-gray-800 text-white placeholder-gray-400"
            />
            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-xl"
            >
              Save Book
            </button>
          </form>
        )}

        {/* ✅ BOOK CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 w-full">
          {books.length > 0 ? (
            books.map((book) => (
              <div
                key={book._id}
                className="bg-gray-800 bg-opacity-80 backdrop-blur-sm p-4 rounded-xl shadow-lg flex flex-col"
              >
                {book.imageUrl && (
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                )}
                <div className="flex flex-col flex-grow">
                  <h2 className="text-lg sm:text-xl font-bold">{book.title}</h2>
                  <p className="text-sm text-gray-400">by {book.author}</p>
                  <p className="mt-2 text-gray-300 text-sm flex-grow">
                    {book.description}
                  </p>
                  {book.readUrl && (
                    <a
                      href={book.readUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 bg-pink-600 hover:bg-pink-700 px-3 py-1 rounded-lg text-sm text-center"
                    >
                      📖 Read Now
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-full">
              No emotional books yet. Add one to get started!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
