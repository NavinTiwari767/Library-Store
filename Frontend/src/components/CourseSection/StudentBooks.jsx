import React, { useEffect, useState } from "react";

const StudentBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch books from backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/books");
        const data = await res.json();
        setBooks(data);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching books:", error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) return <p className="text-center text-lg font-semibold">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">📚 Student Books</h2>
      {books.length === 0 ? (
        <p className="text-center text-gray-500">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="border rounded-lg shadow-md hover:shadow-lg p-4 bg-white"
            >
              {book.image && (
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              )}
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author}</p>
              <p className="mt-2 text-gray-700 text-sm">{book.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentBooks;
