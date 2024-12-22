import { useState } from "react";
import { addBook } from "@/services/bookService"; // Assuming a service to handle API requests

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [genre, setGenre] = useState(""); // New genre state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !author || !description || !price || !image || !genre) {
      setError("All fields are required.");
      return;
    }

    try {
      const bookData = {
        title,
        author,
        description,
        price: parseFloat(price),
        image,
        genre, // Add genre to the data object
      };
      await addBook(bookData);
      setSuccess("Book added successfully!");
      // Reset form fields
      setTitle("");
      setAuthor("");
      setDescription("");
      setPrice("");
      setImage("");
      setGenre(""); // Reset genre
    } catch (err) {
      setError("Failed to add book. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Add a New Book</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="url"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        {/* Genre Dropdown */}
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full p-3 border rounded-lg"
        >
          <option value="">Select Genre</option>
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-fiction</option>
          <option value="mystery">Mystery</option>
          <option value="fantasy">Fantasy</option>
          <option value="biography">Biography</option>
          <option value="science">Science</option>
          <option value="history">History</option>
          <option value="romance">Romance</option>
          {/* Add more genres as needed */}
        </select>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-lg"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}
