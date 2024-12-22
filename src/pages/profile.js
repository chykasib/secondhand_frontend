/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

export default function Profile() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserBooks = async () => {
      if (user) {
        setLoading(true);
        setError("");
        try {
          const response = await axios.get(
            `http://localhost:5000/api/books?userId=${user._id}&limit=100`
          );
          setBooks(response.data.books);
        } catch (err) {
          setError("Failed to fetch your books.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserBooks();
  }, [user]);

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>
        <div className="flex items-center mb-6">
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-16 h-16 rounded-full mr-4"
            />
          )}
          <div>
            <h2 className="text-xl font-semibold">
              {user.displayName || user.email}
            </h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4">My Books</h2>
        {loading ? (
          <p>Loading your books...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {books.map((book) => (
              <div key={book._id} className="p-4 border rounded-lg shadow">
                <h3 className="text-lg font-bold">{book.title}</h3>
                <p className="text-gray-600">by {book.author}</p>
                <p className="text-sm truncate">{book.description}</p>
                <div className="flex space-x-2 mt-2">
                  <Link href={`/book/edit/${book._id}`}>
                    <a className="text-yellow-500 hover:underline">Edit</a>
                  </Link>
                  <Link href={`/book/${book._id}`}>
                    <a className="text-blue-500 hover:underline">View</a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>You have not added any books yet.</p>
        )}
      </div>
    </ProtectedRoute>
  );
}
