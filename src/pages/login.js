/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // Redirect to homepage
    } catch (err) {
      setError(err.message);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/"); // Redirect to homepage
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Log In</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Log In
          </button>
        </form>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 mt-4 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Sign In with Google
        </button>

        <p className="text-gray-600 mt-4 text-center">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
