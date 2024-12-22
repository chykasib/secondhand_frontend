import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getBookById, updateBook } from "@/services/bookService";

export default function EditBook() {
  const router = useRouter();
  const { id } = router.query;

  const [book, setBook] = useState({ title: "", author: "", description: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          const data = await getBookById(id);
          setBook(data);
        } catch (err) {
          setError("Failed to fetch book details");
        }
      };
      fetchBook();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBook(id, book);
      alert("Book updated successfully!");
      router.push(`/book/${id}`);
    } catch (err) {
      setError("Failed to update book. Please try again.");
    }
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={book.title}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={book.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-lg"
        >
          Update Book
        </button>
      </form>
    </div>
  );
}
