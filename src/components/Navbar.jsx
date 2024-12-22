/* eslint-disable @next/next/no-img-element */
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";

export default function Navbar() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">BookStore</h1>
        <div className="flex items-center">
          {user ? (
            <>
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-8 h-8 rounded-full mr-4"
                />
              )}
              <span className="mr-4">{user.displayName || user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <a href="/login" className="bg-blue-500 px-3 py-1 rounded">
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
