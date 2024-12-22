import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function UpdateProfile() {
  const { user, setUser } = useAuth();
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [photoURL, setPhotoURL] = useState(user.photoURL || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${user._id}`,
        {
          displayName,
          photoURL,
        }
      );
      setUser(response.data);
      setSuccess("Profile updated successfully!");
      setError("");
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      setSuccess("");
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Profile Picture URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Update Profile
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
