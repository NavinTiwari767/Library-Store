import React from "react";

import { motion } from "framer-motion";

// Sample book data
const books = [
  {
    id: 1,
    title: "Book 1",
    description: "This is a short description of Book 1. Explore more by reading it.",
    image: "/books/book1.jpg", // Replace with your image path
    pdfLink: "/pdfs/book1.pdf" // Replace with your PDF path
  },
  {
    id: 2,
    title: "Book 2",
    description: "This is a short description of Book 2. Explore more by reading it.",
    image: "/books/book2.jpg",
    pdfLink: "/pdfs/book2.pdf"
  },
  {
    id: 3,
    title: "Book 3",
    description: "This is a short description of Book 3. Explore more by reading it.",
    image: "/books/book3.jpg",
    pdfLink: "/pdfs/book3.pdf"
  }
];

const Cards = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white bg-[#000011]">
      {/* Heading */}
      <h1 className="text-4xl font-bold mt-10">Our Books</h1>

      {/* Cards Section */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pb-20">
        {books.map((book) => (
          <motion.div
            key={book.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 text-center border border-white/20"
          >
            {/* Book Image */}
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />

            {/* Book Title */}
            <h2 className="text-2xl font-semibold mb-2">{book.title}</h2>

            {/* Description */}
            <p className="mb-6 text-gray-200">{book.description}</p>

            {/* Read Book Button */}
            <a
              href={book.pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition"
            >
              Read Book
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};


export default Cards;
