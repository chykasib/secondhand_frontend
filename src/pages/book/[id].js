import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getBookById, deleteBook } from "@/services/bookService";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

export default function BookDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const [book, setBook] = useState(null);
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

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirm) {
      try {
        await deleteBook(id);
        alert("Book deleted successfully!");
        router.push("/");
      } catch (err) {
        alert("Failed to delete book.");
      }
    }
  };

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!book) {
    return <div className="text-center">Loading...</div>;
  }

  const isOwner = user && user._id === book.user._id;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
      <p className="text-gray-600 text-lg">by {book.author}</p>
      {book.image && (
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-60 object-cover rounded mt-4"
        />
      )}
      <p className="mt-4 text-gray-800">{book.description}</p>
      <p className="text-sm text-gray-500 mt-4">
        Added by: {book.user.email} on{" "}
        {new Date(book.createdAt).toLocaleDateString()}
      </p>

      {isOwner && (
        <div className="flex space-x-4 mt-6">
          <Link href={`/book/edit/${book._id}`}>
            <a className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
              Edit Book
            </a>
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete Book
          </button>
        </div>
      )}

      <button
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => router.back()}
      >
        Back
      </button>
    </div>
  );
}
