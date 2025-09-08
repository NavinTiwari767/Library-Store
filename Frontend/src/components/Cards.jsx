import React from "react";
import { motion } from "framer-motion";

// Sample book data
const books = [
  {
    id: 1,
    title: "Rich Dad Poor Dad",
    description:
      "A classic personal finance book that challenges conventional wisdom about money.",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    pdfLink:
      "http://fop86.com/Rich%20Dad%20Poor%20Dad/Rich%20Dad%20Poor%20Dad.pdf",
  },
  {
    id: 2,
    title: "The Psychology of Money",
    description:
      "Exploring how people think about money and the psychological aspects of financial decisions.",
    image:
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    pdfLink:
      "https://drive.google.com/file/d/1JmHEfCLYohnL10qNdfSFflkScdrnANhh/view?usp=sharing",
  },
  {
    id: 3,
    title: "Atomic Habits",
    description:
      "Learn how tiny changes can yield remarkable results in building good habits.",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    pdfLink:
      "https://drive.google.com/file/d/19nBG8wVZWVpZS1A848O3YiNzpT3spBE0/view?usp=sharing",
  },
];

const Cards = () => {
  return (
    <div
      className="
        min-h-screen 
        flex flex-col 
        justify-start md:justify-center 
        items-center 
        text-white 
        bg-gradient-to-br from-[#000011] to-[#0a0a2a] 
        pt-12 md:pt-0
      "
    >
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold mb-4 text-center"
      >
        Our Books Collection
      </motion.h1>
      <p className="text-gray-400 mb-12 text-center max-w-2xl px-4">
        Discover our curated selection of must-read books for personal and
        financial growth
      </p>

      {/* Cards Section */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pb-12">
        {books.map((book) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: book.id * 0.1 }}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.2 },
            }}
            className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/10 flex flex-col"
          >
            {/* Book Image */}
            <div className="relative h-60 overflow-hidden">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-sm">Click to read preview</span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
              <p className="mb-6 text-gray-300 flex-grow">
                {book.description}
              </p>
              <a
                href={book.pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-center px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-blue-500/20"
              >
                Read Book Now
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
