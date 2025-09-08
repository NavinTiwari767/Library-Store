import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentDashboard = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ 
    title: '', 
    author: '', 
    isbn: '', 
    bookLink: '',
    bookType: 'philosophy' 
  });
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const navigate = useNavigate();
  
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const bookTypes = [
    { value: 'philosophy', label: '🧠 Philosophy', color: 'bg-red-500' },
    { value: 'love', label: '❤️ Love', color: 'bg-pink-600' },
    { value: 'emotional', label: '😳 Emotional', color: 'bg-red-600' },
    { value: 'self', label: '🧘‍♂️ Self-Help', color: 'bg-green-600' },
    { value: 'holy', label: '📖 Holy Books', color: 'bg-indigo-500' },
    { value: 'other', label: '📚 Other', color: 'bg-blue-600' }
  ];

  useEffect(() => {
    if (!user || user.role !== "student") {
      navigate('/login');
      return;
    }
    fetchBooks();
  }, [user, navigate]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/user/${user._id}/books`);
      setBooks(res.data.books);
    } catch (err) {
      console.error("Error fetching books:", err);
      alert("Error fetching books: " + (err.response?.data?.message || "Server error"));
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await axios.post(`http://localhost:5000/api/user/${user._id}/books`, newBook);
      setBooks(res.data.books);
      setNewBook({ title: '', author: '', isbn: '', bookLink: '', bookType: 'philosophy' });
      alert("Book added successfully!");
    } catch (err) {
      console.error("Error adding book:", err);
      alert("Error adding book: " + (err.response?.data?.message || "Server error"));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        const res = await axios.delete(`http://localhost:5000/api/user/${user._id}/books/${bookId}`);
        setBooks(res.data.books);
        alert("Book deleted successfully!");
      } catch (err) {
        console.error("Error deleting book:", err);
        alert("Error deleting book: " + (err.response?.data?.message || "Server error"));
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/login');
  };

  const filteredBooks = filterType === 'all' 
    ? books 
    : books.filter(book => book.bookType === filterType);

  const getTypeColor = (type) => {
    const bookType = bookTypes.find(t => t.value === type);
    return bookType ? bookType.color : 'bg-gray-600';
  };

  const getTypeLabel = (type) => {
    const bookType = bookTypes.find(t => t.value === type);
    return bookType ? bookType.label : '📚 Other';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <p className="text-gray-400 mt-2">Manage your personal book collection</p>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-red-600 px-6 py-2 rounded-md hover:bg-red-700 transition flex items-center gap-2"
          >
            <span>🚪</span>
            Logout
          </button>
        </div>

        {/* Welcome message */}
        <div className="bg-gradient-to-r from-cyan-900 to-purple-900 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-2">Welcome back, {user.fullname}! 👋</h2>
          <p className="text-cyan-200">You have {books.length} books in your collection</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Book Form */}
          <div className="lg:col-span-1 bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">➕ Add New Book</h2>
            <form onSubmit={handleAddBook} className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Book Title *</label>
                <input
                  type="text"
                  placeholder="Enter book title"
                  value={newBook.title}
                  onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Author *</label>
                <input
                  type="text"
                  placeholder="Enter author name"
                  value={newBook.author}
                  onChange={(e) => setNewBook({...newBook, author: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">ISBN</label>
                <input
                  type="text"
                  placeholder="Enter ISBN number"
                  value={newBook.isbn}
                  onChange={(e) => setNewBook({...newBook, isbn: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Book Link</label>
                <input
                  type="url"
                  placeholder="https://example.com/book"
                  value={newBook.bookLink}
                  onChange={(e) => setNewBook({...newBook, bookLink: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Book Type *</label>
                <select
                  value={newBook.bookType}
                  onChange={(e) => setNewBook({...newBook, bookType: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                >
                  {bookTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 py-3 rounded-md hover:from-cyan-700 hover:to-purple-700 disabled:opacity-50 transition flex items-center justify-center gap-2"
              >
                {loading ? '⏳ Adding...' : '📚 Add Book'}
              </button>
            </form>
          </div>

          {/* Books List */}
          <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-xl font-semibold">Your Book Collection</h2>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Filter:</span>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-1 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="all">All Types</option>
                  {bookTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {filteredBooks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <p className="text-gray-400 text-lg">
                  {filterType === 'all' 
                    ? "You haven't added any books yet. Start building your collection!"
                    : `No ${getTypeLabel(filterType)} books found.`
                  }
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredBooks.map((book, index) => (
                  <div key={index} className={`p-4 rounded-lg relative group ${getTypeColor(book.bookType)}`}>
                    <button
                      onClick={() => handleDeleteBook(book._id)}
                      className="absolute top-3 right-3 text-white hover:text-red-300 text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete book"
                    >
                      ×
                    </button>
                    
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-sm font-medium px-2 py-1 bg-black bg-opacity-30 rounded">
                        {getTypeLabel(book.bookType)}
                      </span>
                      <span className="text-xs text-white text-opacity-70">
                        {new Date(book.addedDate).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">{book.title}</h3>
                    <p className="text-white text-opacity-90 mb-3">By: {book.author}</p>
                    
                    {book.isbn && (
                      <p className="text-sm text-white text-opacity-70 mb-2">
                        ISBN: {book.isbn}
                      </p>
                    )}
                    
                    {book.bookLink && (
                      <a
                        href={book.bookLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-100 text-sm transition"
                      >
                        🔗 View Book Link
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Statistics */}
            {books.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-700">
                <h3 className="text-lg font-semibold mb-3">Collection Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-gray-700 p-3 rounded text-center">
                    <div className="text-2xl font-bold">{books.length}</div>
                    <div className="text-sm text-gray-400">Total Books</div>
                  </div>
                  <div className="bg-gray-700 p-3 rounded text-center">
                    <div className="text-2xl font-bold">
                      {new Set(books.map(b => b.bookType)).size}
                    </div>
                    <div className="text-sm text-gray-400">Categories</div>
                  </div>
                  <div className="bg-gray-700 p-3 rounded text-center">
                    <div className="text-2xl font-bold">
                      {new Set(books.map(b => b.author)).size}
                    </div>
                    <div className="text-sm text-gray-400">Authors</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;