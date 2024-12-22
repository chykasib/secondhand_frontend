import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

// Create Context
const AuthContext = createContext();

// Provide Context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loading when user state is resolved
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use Auth
export const useAuth = () => useContext(AuthContext);
