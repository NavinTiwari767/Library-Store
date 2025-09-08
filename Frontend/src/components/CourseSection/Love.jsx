import React, { useEffect, useState } from "react";
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
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-gray-200 p-4 sm:p-6 overflow-hidden font-sans">
      {/* Subtle star effect */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIi8+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMC41Ii8+PGNpcmNsZSBjeD0iNTAiIGN5PSI0MCIgcj0iMC43Ii8+PGNpcmNsZSBjeD0iMjUiIGN5PSI0NSIgcj0iMC4zIi8+PGNpcmNsZSBjeD0iNDUiIGN5PSIyMCIgcj0iMC42Ii8+PC9nPjwvc3ZnPg==')] opacity-40"></div>
      
      {/* Header */}
      <nav className="bg-black bg-opacity-70 backdrop-blur-md text-white py-4 px-6 rounded-2xl shadow-xl mb-8 border border-blue-800">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center">
            <span className="text-rose-400 mr-3">❤️</span>
            <span className="bg-gradient-to-r from-rose-400 to-blue-400 text-transparent bg-clip-text">
              Love Books
            </span>
          </h1>
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              className="bg-gradient-to-r from-rose-600 to-blue-700 hover:from-blue-700 hover:to-rose-600 text-white text-xs sm:text-base px-3 py-1.5 sm:px-6 sm:py-2 rounded-lg sm:rounded-xl shadow-md font-semibold transition-all flex items-center"
              onClick={() => setShowForm(true)}
            >
              <span className="mr-2">+</span> Upload
            </button>
            <Link to="/" className="text-xl sm:text-2xl text-blue-300 hover:text-white transition-colors" title="Go to Home">
              🏠
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-rose-200 mb-3">Cozy Reading Corner</h2>
        <p className="text-lg text-blue-200 max-w-3xl mx-auto">Curate your collection of romantic stories and lose yourself in tales of love and passion</p>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
          <div className="relative bg-gray-900 rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md border border-blue-700">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-4 text-blue-300 hover:text-white text-3xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-rose-300">Add New Book</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text" name="title" placeholder="Book Title" value={formData.title} onChange={handleChange}
                className="p-2 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-white bg-gray-800 placeholder-blue-200" required
              />
              <input
                type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange}
                className="p-2 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-white bg-gray-800 placeholder-blue-200" required
              />
              <textarea
                name="description" placeholder="Description" value={formData.description} onChange={handleChange}
                className="p-2 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-white bg-gray-800 placeholder-blue-200" required
              />
              <input
                type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange}
                className="p-2 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-white bg-gray-800 placeholder-blue-200"
              />
              <input
                type="text" name="readUrl" placeholder="Read Now URL (PDF link)" value={formData.readUrl} onChange={handleChange}
                className="p-2 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-white bg-gray-800 placeholder-blue-200"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-rose-600 to-blue-700 text-white font-semibold shadow-md hover:from-blue-700 hover:to-rose-600 transition-all"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Book Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-gray-900 bg-opacity-70 backdrop-blur-md text-white rounded-2xl shadow-xl overflow-hidden hover:scale-[1.02] transition-transform border border-blue-800 flex flex-col relative"
          >
            <div className="absolute top-4 right-4 text-xl text-blue-300">✨</div>
            
            {book.imageUrl && (
              <img
                src={book.imageUrl}
                alt={book.title}
                className="h-48 w-full object-cover"
              />
            )}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-rose-200">
                  {book.title}
                </h3>
                <p className="text-sm text-blue-300 mb-2">By {book.author}</p>
                <p className="text-sm text-gray-300 mt-3">{book.description}</p>
              </div>
              {book.readUrl && (
                <a
                  href={book.readUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-gradient-to-r from-rose-600 to-blue-700 hover:from-blue-700 hover:to-rose-600 text-white text-center py-2 px-4 rounded-xl font-semibold shadow-md transition-all"
                >
                  📖 Read Now
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="hidden lg:block">
        <div className="absolute bottom-10 left-10 text-5xl text-blue-500 opacity-60 floating-element">📚</div>
        <div className="absolute top-40 right-16 text-4xl text-rose-400 opacity-70 floating-element" style={{animationDelay: '1s'}}>❤️</div>
      
      </div>

      {/* Footer */}
      <footer className="bg-black bg-opacity-70 text-blue-200 py-6 mt-12 rounded-2xl shadow-xl border border-blue-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">Get lost in the pages of love</p>
          <div className="flex justify-center space-x-6 mt-4 text-2xl">
            <span className="text-rose-400">❤️</span>
            <span className="text-blue-400">📚</span>
            <span className="text-purple-400">✨</span>
          </div>
          <p className="mt-6 text-sm opacity-75">© 2023 Love Books - Your cozy reading corner</p>
        </div>
      </footer>

      {/* Add the CSS for animations */}
      <style>
        {`
          @keyframes floating {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes pageTurn {
            0%, 100% { transform: rotateY(0deg); }
            50% { transform: rotateY(15deg); }
          }
          
          .floating-element {
            animation: floating 8s infinite ease-in-out;
          }
          
          .page-turn-element {
            animation: pageTurn 15s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
}