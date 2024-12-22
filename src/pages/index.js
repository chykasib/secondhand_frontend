import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import axios from "axios"; // Install axios if not already installed

export default function Home() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch books from the backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/books"); // Backend API
        setBooks(response.data);
        setFilteredBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  // Filter books based on search input
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    );
    setFilteredBooks(filtered);
  };

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Explore Our Book Collection
        </h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Book Listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div
                key={book._id}
                className="bg-white shadow-md rounded-lg p-4 border"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-40 object-cover rounded"
                />
                <h2 className="text-xl font-semibold mt-4">{book.title}</h2>
                <p className="text-gray-700">by {book.author}</p>
                <p className="mt-2 text-gray-600">{book.description}</p>
                <p className="mt-2 font-bold text-gray-800">${book.price}</p>
                <a
                  href={`/book/${book._id}`}
                  className="mt-4 inline-block text-blue-600 hover:underline"
                >
                  View Details
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">
              No books found matching your search.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
