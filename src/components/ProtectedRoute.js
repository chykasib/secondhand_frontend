import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [user, loading, router]);

  if (loading) {
    return <p className="text-center mt-8">Loading...</p>; // Show a loading state while checking auth
  }

  return children;
}
